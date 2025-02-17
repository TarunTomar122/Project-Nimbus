'use client';

import './globals.css';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';
import { SelectionOverlay } from './components/SelectionOverlay/SelectionOverlay';

export default function Home() {
  return (
    <div>
      <div className='canvas-container'>
        <Canvas />
        <SelectionOverlay />
      </div>
      <Toolbar />
    </div>
  );
}
