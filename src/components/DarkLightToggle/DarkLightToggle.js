'use client';
import React from 'react';

import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '@/components/VisuallyHidden';

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  COLOR_THEME_COOKIE_NAME,
} from '@/constants';
import Cookie from 'js-cookie';

function DarkLightToggle({ initialTheme, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleToggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 1000 });

    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button onClick={handleToggleTheme} {...delegated}>
      {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
