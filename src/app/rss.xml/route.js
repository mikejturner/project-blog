import RSS from 'rss';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

export async function GET() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  blogPosts.forEach(({ title, abstract, publishedOn, slug }) => {
    feed.item({
      title,
      description: abstract,
      url: slug,
      date: publishedOn,
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}
