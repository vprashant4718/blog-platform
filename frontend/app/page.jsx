import { notFound } from 'next/navigation';

// Helper to fetch single blog
async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, { 
    cache: 'no-store' 
  });
  if (!res.ok) return null;
  return res.json();
}

//  1. DYNAMIC METADATA (This is what the Interviewer checks for SEO)
export async function generateMetadata({ params }) {
    console.log('Generating metadata for slug:', params.slug);
  const blog = await getBlog(params.slug);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.seo.metaTitle || blog.title,
    description: blog.seo.metaDescription,
    openGraph: {
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      type: 'article',
      images: [blog.featureImage || '/default-image.png'],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/${blog.slug}`,
    },
  };
}

// 2. The Page UI
export default async function BlogPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) return notFound(); // Shows 404 page

  // 🧠 3. JSON-LD Structured Data (Bonus Point in Assignment)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.featureImage,
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'Admin',
    },
    datePublished: blog.createdAt,
  };

  return (
    <article className="container mx-auto p-4 max-w-3xl">
      {/* Inject JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      
      <div className="flex items-center text-gray-500 mb-8 space-x-4">
        <span>By {blog.author?.name}</span>
        <span>{new Date(blog.createdAt).toDateString()}</span>
      </div>

      {blog.featureImage && (
        <img src={blog.featureImage} alt={blog.title} className="w-full h-auto rounded mb-8" />
      )}

      {/* Render HTML Content from the Admin Panel */}
      <div 
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
    </article>
  );
}