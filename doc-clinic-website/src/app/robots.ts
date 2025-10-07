import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Applies to all bots
        allow: '/', // Allow crawling of everything by default
        disallow: [ // But disallow these specific paths
          '/admin/', 
          '/login',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}