import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';

import styles from './homepage.module.css';

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

async function Home() {
  const blogPostList = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPostList.map(({ slug, title, abstract, publishedOn }) => {
        return (
          <BlogSummaryCard
            key={slug}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
