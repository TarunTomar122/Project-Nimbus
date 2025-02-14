'use client';

import './globals.css';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';

export default function Home() {
  return (
    <div>
      <div className='canvas-container'>
        <Canvas />
      </div>
      <Toolbar />
    </div>
  );
}
