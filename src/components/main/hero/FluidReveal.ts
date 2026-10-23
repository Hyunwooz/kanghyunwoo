import * as THREE from 'three';

/*
 * noth.in 히어로의 "유체 마스크" 를 옮긴 것.
 * 흰 바탕 + 워드마크를 텍스처로 구운 뒤, 마우스 궤적을 Navier-Stokes 염료 시뮬레이션으로 퍼뜨리고
 * 염료가 쌓인 곳만 투명하게 뚫어 뒤의 미디어가 보이게 한다.
 * 수치는 원본 설정값(sA) 그대로.
 */
const CONFIG = {
  simResolution: 256,
  dyeResolution: 512,
  velocityDissipation: 0.962,
  dyeDissipation: 0.988,
  pressureIterations: 20,
  curlStrength: 0,
  splatRadius: 6e-5,
  splatForce: 5900,
  revealSize: 3.9,
  edgeSoftness: 0.5,
  edgeWidth: 0.01,
};

const quadVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const advectionFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;
vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main() {
  vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
  gl_FragColor = uDissipation * bilerp(uSource, coord, uTexelSize);
  gl_FragColor.a = 1.0;
}`;

const splatFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float uAspectRatio;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspectRatio;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`;

const neighbours = /* glsl */ `
  vec2 L = vUv - vec2(uTexelSize.x, 0.0);
  vec2 R = vUv + vec2(uTexelSize.x, 0.0);
  vec2 T = vUv + vec2(0.0, uTexelSize.y);
  vec2 B = vUv - vec2(0.0, uTexelSize.y);
`;

const curlFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
void main() {
  ${neighbours}
  float l = texture2D(uVelocity, L).y;
  float r = texture2D(uVelocity, R).y;
  float t = texture2D(uVelocity, T).x;
  float b = texture2D(uVelocity, B).x;
  float vorticity = r - l - t + b;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`;

const vorticityFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uTexelSize;
uniform float uCurlStrength;
uniform float uDt;
void main() {
  ${neighbours}
  float l = texture2D(uCurl, L).x;
  float r = texture2D(uCurl, R).x;
  float t = texture2D(uCurl, T).x;
  float b = texture2D(uCurl, B).x;
  float c = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * c;
  force.y *= -1.0;
  vec2 velocity = texture2D(uVelocity, vUv).xy + force * uDt;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const divergenceFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
void main() {
  ${neighbours}
  float l = texture2D(uVelocity, L).x;
  float r = texture2D(uVelocity, R).x;
  float t = texture2D(uVelocity, T).y;
  float b = texture2D(uVelocity, B).y;
  vec2 c = texture2D(uVelocity, vUv).xy;
  if (L.x < 0.0) l = -c.x;
  if (R.x > 1.0) r = -c.x;
  if (T.y > 1.0) t = -c.y;
  if (B.y < 0.0) b = -c.y;
  gl_FragColor = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
}`;

const pressureFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexelSize;
void main() {
  ${neighbours}
  float l = texture2D(uPressure, L).x;
  float r = texture2D(uPressure, R).x;
  float t = texture2D(uPressure, T).x;
  float b = texture2D(uPressure, B).x;
  float div = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((l + r + b + t - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const gradientFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
void main() {
  ${neighbours}
  float l = texture2D(uPressure, L).x;
  float r = texture2D(uPressure, R).x;
  float t = texture2D(uPressure, T).x;
  float b = texture2D(uPressure, B).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity -= vec2(r - l, t - b) * 0.5;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const clearFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uValue;
void main() {
  gl_FragColor = uValue * texture2D(uTexture, vUv);
}`;

const revealFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uBaseTexture;
uniform sampler2D uDye;
uniform float uRevealSize;
uniform float uEdgeSoftness;
uniform float uEdgeWidth;
void main() {
  float dye = texture2D(uDye, vUv).r;
  vec4 baseColor = texture2D(uBaseTexture, vUv);
  float mask = smoothstep(uEdgeSoftness, uEdgeSoftness + uEdgeWidth, dye * uRevealSize);
  mask = clamp(mask, 0.0, 1.0);
  gl_FragColor = mix(baseColor, vec4(0.0), mask);
}`;

type Fbo = THREE.WebGLRenderTarget;
interface DoubleFbo {
  read: Fbo;
  write: Fbo;
  swap: () => void;
}

const createFbo = (size: number, filter: THREE.MagnificationTextureFilter): Fbo =>
  new THREE.WebGLRenderTarget(size, size, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: filter,
    magFilter: filter,
    depthBuffer: false,
    stencilBuffer: false,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
  });

const createDoubleFbo = (size: number, filter: THREE.MagnificationTextureFilter): DoubleFbo => {
  const fbo = { read: createFbo(size, filter), write: createFbo(size, filter) } as DoubleFbo;
  fbo.swap = () => {
    const temp = fbo.read;
    fbo.read = fbo.write;
    fbo.write = temp;
  };
  return fbo;
};

interface FluidRevealOptions {
  container: HTMLElement;
  svg: SVGSVGElement;
  // false 를 돌려주면 시뮬레이션을 멈추고 화면을 깨끗하게 되돌린다 (쇼릴이 줄어들 때 등)
  isActive?: () => boolean;
}

export class FluidReveal {
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private quadScene = new THREE.Scene();
  private quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quad: THREE.Mesh;
  private displayScene = new THREE.Scene();
  private displayCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private displayMaterial: THREE.ShaderMaterial;
  private baseTexture: THREE.CanvasTexture;
  private baseCanvas = document.createElement('canvas');
  private materials: Record<string, THREE.ShaderMaterial> = {};
  private velocity: DoubleFbo;
  private dye: DoubleFbo;
  private pressure: DoubleFbo;
  private divergence: Fbo;
  private curl: Fbo;
  private mouse = new THREE.Vector2();
  private prevMouse = new THREE.Vector2();
  private mouseMoved = false;
  private paused = false;
  private raf = 0;
  private rebakeTimer = 0;
  private resizeObserver: ResizeObserver;

  constructor(private options: FluidRevealOptions) {
    const { container } = options;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'mask-reveal-canvas';
    Object.assign(this.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '1',
    });
    container.insertBefore(this.canvas, container.querySelector('[data-hero-section]'));

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.autoClear = false;

    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quadScene.add(this.quad);

    const pass = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>) =>
      new THREE.ShaderMaterial({
        vertexShader: quadVert,
        fragmentShader,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });
    const simTexel = new THREE.Vector2(1 / CONFIG.simResolution, 1 / CONFIG.simResolution);
    const dyeTexel = new THREE.Vector2(1 / CONFIG.dyeResolution, 1 / CONFIG.dyeResolution);

    this.materials = {
      advection: pass(advectionFrag, {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: simTexel },
        uDt: { value: 1 },
        uDissipation: { value: CONFIG.velocityDissipation },
      }),
      splat: pass(splatFrag, {
        uTarget: { value: null },
        uAspectRatio: { value: 1 },
        uColor: { value: new THREE.Vector3() },
        uPoint: { value: new THREE.Vector2() },
        uRadius: { value: CONFIG.splatRadius },
      }),
      curl: pass(curlFrag, { uVelocity: { value: null }, uTexelSize: { value: simTexel } }),
      vorticity: pass(vorticityFrag, {
        uVelocity: { value: null },
        uCurl: { value: null },
        uTexelSize: { value: simTexel },
        uCurlStrength: { value: CONFIG.curlStrength },
        uDt: { value: 0.016 },
      }),
      divergence: pass(divergenceFrag, { uVelocity: { value: null }, uTexelSize: { value: simTexel } }),
      pressure: pass(pressureFrag, {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexelSize: { value: simTexel },
      }),
      gradient: pass(gradientFrag, {
        uPressure: { value: null },
        uVelocity: { value: null },
        uTexelSize: { value: simTexel },
      }),
      clear: pass(clearFrag, { uTexture: { value: null }, uValue: { value: 0 } }),
    };
    this.materials.dyeTexel = pass(advectionFrag, {
      uVelocity: { value: null },
      uSource: { value: null },
      uTexelSize: { value: dyeTexel },
      uDt: { value: 1 },
      uDissipation: { value: CONFIG.dyeDissipation },
    });

    this.velocity = createDoubleFbo(CONFIG.simResolution, THREE.LinearFilter);
    this.pressure = createDoubleFbo(CONFIG.simResolution, THREE.NearestFilter);
    this.dye = createDoubleFbo(CONFIG.dyeResolution, THREE.LinearFilter);
    this.divergence = createFbo(CONFIG.simResolution, THREE.NearestFilter);
    this.curl = createFbo(CONFIG.simResolution, THREE.NearestFilter);

    this.baseTexture = new THREE.CanvasTexture(this.baseCanvas);
    this.baseTexture.colorSpace = THREE.SRGBColorSpace;
    this.displayMaterial = new THREE.ShaderMaterial({
      vertexShader: quadVert,
      fragmentShader: revealFrag,
      uniforms: {
        uBaseTexture: { value: this.baseTexture },
        uDye: { value: null },
        uRevealSize: { value: CONFIG.revealSize },
        uEdgeSoftness: { value: CONFIG.edgeSoftness },
        uEdgeWidth: { value: CONFIG.edgeWidth },
      },
      transparent: true,
      depthWrite: false,
    });
    this.displayScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.displayMaterial));

    this.resize();
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      window.clearTimeout(this.rebakeTimer);
      this.rebakeTimer = window.setTimeout(() => this.bake(), 120);
    });
    this.resizeObserver.observe(container);

    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('touchmove', this.onTouch, { passive: true });
  }

  // SVG 워드마크를 흰 바탕 캔버스에 화면과 같은 위치로 굽는다
  async bake() {
    const { container, svg } = this.options;
    const rect = container.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.baseCanvas.width = Math.max(1, Math.round(rect.width * dpr));
    this.baseCanvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = this.baseCanvas.getContext('2d');
    if (!ctx) return;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('width', String(svgRect.width));
    clone.setAttribute('height', String(svgRect.height));
    clone.style.visibility = 'visible';
    clone.querySelectorAll('path').forEach((p) => {
      p.removeAttribute('style');
      p.setAttribute('fill', getComputedStyle(svg).color || '#000');
    });
    const data = new XMLSerializer().serializeToString(clone);
    const img = new Image();
    img.decoding = 'async';
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`;
    await img.decode().catch(() => undefined);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, this.baseCanvas.width, this.baseCanvas.height);
    ctx.drawImage(
      img,
      (svgRect.left - rect.left) * dpr,
      (svgRect.top - rect.top) * dpr,
      svgRect.width * dpr,
      svgRect.height * dpr,
    );
    this.baseTexture.needsUpdate = true;
  }

  // 첫 프레임을 바로 그린 뒤에 SVG 를 숨겨야 캔버스가 비어 있는 한 프레임(배경 깜빡임)이 안 생긴다
  start() {
    this.step();
    this.options.svg.style.visibility = 'hidden';
    const loop = () => {
      this.step();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private resize() {
    const rect = this.options.container.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height, false);
  }

  private setPointer(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.set((clientX - rect.left) / rect.width, 1 - (clientY - rect.top) / rect.height);
    if (!this.mouseMoved) {
      this.prevMouse.copy(this.mouse);
      this.mouseMoved = true;
    }
  }

  private onMove = (event: MouseEvent) => this.setPointer(event.clientX, event.clientY);
  private onTouch = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) this.setPointer(touch.clientX, touch.clientY);
  };

  private render(material: THREE.ShaderMaterial, target: Fbo | null) {
    this.quad.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  private splat(target: DoubleFbo, color: THREE.Vector3, aspect: number) {
    const m = this.materials.splat;
    m.uniforms.uTarget.value = target.read.texture;
    m.uniforms.uAspectRatio.value = aspect;
    m.uniforms.uPoint.value.copy(this.mouse);
    m.uniforms.uColor.value.copy(color);
    this.render(m, target.write);
    target.swap();
  }

  private clearAll() {
    const m = this.materials.clear;
    m.uniforms.uValue.value = 0;
    for (const fbo of [this.velocity, this.dye, this.pressure]) {
      m.uniforms.uTexture.value = fbo.read.texture;
      this.render(m, fbo.write);
      fbo.swap();
    }
  }

  private draw() {
    this.displayMaterial.uniforms.uDye.value = this.dye.read.texture;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.displayScene, this.displayCamera);
  }

  private step() {
    const active = this.options.isActive ? this.options.isActive() : true;
    if (!active) {
      if (!this.paused) {
        this.paused = true;
        this.clearAll();
        this.draw();
      }
      return;
    }
    if (this.paused) {
      this.paused = false;
      this.prevMouse.copy(this.mouse);
    }

    const rect = this.canvas.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    const scrolled = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    const fadeSq = scrolled * scrolled;
    const strength = 1 - fadeSq;

    if (this.mouseMoved) {
      const dx = this.mouse.x - this.prevMouse.x;
      const dy = this.mouse.y - this.prevMouse.y;
      if ((dx !== 0 || dy !== 0) && strength > 0.001) {
        this.splat(
          this.velocity,
          new THREE.Vector3(dx * CONFIG.splatForce * strength, dy * CONFIG.splatForce * strength, 0),
          aspect,
        );
        this.splat(this.dye, new THREE.Vector3(strength, strength, strength), aspect);
      }
      this.prevMouse.copy(this.mouse);
    }

    const m = this.materials;
    m.curl.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(m.curl, this.curl);

    m.vorticity.uniforms.uVelocity.value = this.velocity.read.texture;
    m.vorticity.uniforms.uCurl.value = this.curl.texture;
    this.render(m.vorticity, this.velocity.write);
    this.velocity.swap();

    m.advection.uniforms.uVelocity.value = this.velocity.read.texture;
    m.advection.uniforms.uSource.value = this.velocity.read.texture;
    this.render(m.advection, this.velocity.write);
    this.velocity.swap();

    m.dyeTexel.uniforms.uVelocity.value = this.velocity.read.texture;
    m.dyeTexel.uniforms.uSource.value = this.dye.read.texture;
    m.dyeTexel.uniforms.uDissipation.value =
      CONFIG.dyeDissipation + (0.97 - CONFIG.dyeDissipation) * fadeSq;
    this.render(m.dyeTexel, this.dye.write);
    this.dye.swap();

    m.divergence.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(m.divergence, this.divergence);

    m.clear.uniforms.uTexture.value = this.pressure.read.texture;
    m.clear.uniforms.uValue.value = 0;
    this.render(m.clear, this.pressure.write);
    this.pressure.swap();

    m.pressure.uniforms.uDivergence.value = this.divergence.texture;
    for (let i = 0; i < CONFIG.pressureIterations; i += 1) {
      m.pressure.uniforms.uPressure.value = this.pressure.read.texture;
      this.render(m.pressure, this.pressure.write);
      this.pressure.swap();
    }

    m.gradient.uniforms.uPressure.value = this.pressure.read.texture;
    m.gradient.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(m.gradient, this.velocity.write);
    this.velocity.swap();

    this.draw();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.clearTimeout(this.rebakeTimer);
    this.resizeObserver.disconnect();
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('touchmove', this.onTouch);
    [this.velocity, this.dye, this.pressure].forEach((f) => {
      f.read.dispose();
      f.write.dispose();
    });
    this.divergence.dispose();
    this.curl.dispose();
    Object.values(this.materials).forEach((mat) => mat.dispose());
    this.displayMaterial.dispose();
    this.baseTexture.dispose();
    this.renderer.dispose();
    this.canvas.remove();
    this.options.svg.style.visibility = '';
  }
}
