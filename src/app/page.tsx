'use client';

import Home from '@/containers/home';
import Intro from '@/containers/Intro';
import SideBar from '@/components/layout/sideBar';

const App = () => {
  return (
    <>
      <SideBar />
      <Intro />
      <Home />
    </>
  );
};

export default App;
