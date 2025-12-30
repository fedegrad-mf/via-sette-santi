import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: string) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = ({ site }) => {
    const sitemapURL = site ? new URL('sitemap-index.xml', site).href : '/sitemap-index.xml';
    return new Response(getRobotsTxt(sitemapURL));
};