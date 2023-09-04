'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { MotionConfig, motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setElapsedTime] = React.useState(0);
  const [status, setStatus] = React.useState('idle');

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  function handleReset() {
    setStatus('idle');
    setElapsedTime(0);
  }

  function handleTogglePlay() {
    if (status === 'idle') {
      setStatus('playing');
      // Increase the elapsed time to make the widget respond
      // immediately and feel a bit snappier
      setElapsedTime(timeElapsed + 1);
    } else {
      setStatus('idle');
    }
  }

  React.useEffect(() => {
    if (status !== 'playing') {
      return;
    }
    const intervalId = window.setInterval(() => {
      setElapsedTime((currentValue) => currentValue + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId="selected"
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={handleTogglePlay}>
              {status === 'idle' ? <Play /> : <Pause />}
              <VisuallyHidden>
                {status === 'idle' ? 'Play' : 'Pause'}
              </VisuallyHidden>
            </button>
            <button onClick={handleReset}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
