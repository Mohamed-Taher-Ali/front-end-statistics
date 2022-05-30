import React from 'react';
import { useLightDarkMode } from 'src/hooks/useLightDarkMode';


export function LightDarkMode() {
  const { modesLabel, onToggle, mode } = useLightDarkMode();

  return (
    <div>
      <button className='btn' onClick={onToggle}>
        {
          mode === 'dark'
            ? modesLabel.moveToLight
            : modesLabel.moveToDark
        }
      </button>
    </div>
  )
}