'use client';

import Home from '@/components/home';
import Intro from '@/components/intro';
import SideBar from '@/components/layout/sideBar';

const App = () => {
  return (
    <>
      <Intro />
      <SideBar />
      <Home />
    </>
  );
};

export default App;
