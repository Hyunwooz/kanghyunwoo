import { useEffect } from 'react';
import { cssLogo1, cssLogo2 } from '@/constants/cssLogo';
import { cssRule, cssRule2, cssRule3 } from '@/constants/cssRule';

export const useConsoleWelcome = () => {
  useEffect(() => {
    if (window.console != undefined) {
      setTimeout(
        console.log.bind(console, '%cWooh%cDev', cssLogo1, cssLogo2),
        50,
      );
      setTimeout(
        console.log.bind(
          console,
          `%c안녕하세요. 주니어 프론트 엔드 개발자 강현우입니다
          \n\n%cContact\n\n%cEmail : gusdn0481@gmail.com
          \n\n%cChannel\n\n%cGithub : https://github.com/hyunwooz\n`,
          cssRule3,
          cssRule2,
          cssRule,
          cssRule2,
          cssRule,
        ),
        50,
      );
    }
  }, []);
};
