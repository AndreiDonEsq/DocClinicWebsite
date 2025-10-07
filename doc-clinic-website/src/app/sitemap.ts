import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { type SanityDocument } from 'next-sanity'
import { SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts from Sanity
  const posts = await client.fetch<SanityDocument[]>(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }`);

  const postUrls = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
  }));

  // static page URLs
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}