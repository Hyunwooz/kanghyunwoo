export const scrollToSection = (id: string) => {
  const section = document.getElementById(id); // 이동할 섹션의 ID
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
  }
};
