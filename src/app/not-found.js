import React from 'react';

import styles from './not-found.module.css';

import { BLOG_TITLE } from '@/constants';

export const metadata = {
  title: `404 Not Found · ${BLOG_TITLE}`,
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>This page does not exists. Please check the URL and try again.</p>
    </div>
  );
}

export default NotFound;
