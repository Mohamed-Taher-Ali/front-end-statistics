import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/types';
import { BulletProps } from './types';
 
export function Bullet ({
  color = '',
  size = 8
}: BulletProps) {
  const state = useSelector(s => s as IRootState);
  const currentColor = color || state.colorMode.currentMode.fontColor;

  const styles = {
    outer: {
      border: `2px solid ${currentColor}`,
      borderRadius: '50%',
      display: 'inline-block',
    },
    inner: {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `${currentColor}`,
      borderRadius: '50%',
      margin: '5px',
    }
  };

    return (
      <div style={styles.outer}>
        <div style={styles.inner}></div>
      </div>
    )
}