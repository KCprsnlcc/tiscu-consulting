import { NextResponse } from 'next/server'

export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /studio/

# Host www version
Host: https://www.tiscuconsulting.com

Sitemap: https://www.tiscuconsulting.com/sitemap.xml`
  
  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
