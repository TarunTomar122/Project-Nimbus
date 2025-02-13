'use client';

import './globals.css';
import Header from './components/Header/Header';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='canvas-container'>
        <Canvas />
      </div>
      <Toolbar />
    </div>
  );
}
