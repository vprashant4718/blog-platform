import { notFound } from "next/navigation";

// Fetch single blog
async function getBlog(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ IMPORTANT FIX

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: [blog.featureImage || "/default-image.png"],
      type: "article",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/${blog.slug}`,
    },
  };
}

/* =========================
   PAGE UI
========================= */
export default async function BlogPage({ params }) {
  const { slug } = await params; // ✅ IMPORTANT FIX

  const blog = await getBlog(slug);
  console.log(blog);
  if (!blog) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.featureImage,
    author: {
      "@type": "Person",
      name: blog.author?.name || "Admin",
    },
    datePublished: blog.createdAt,
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <span>By {blog.author?.name || "Admin"}</span>
        <span>{new Date(blog.createdAt).toDateString()}</span>
      </div>

      {blog.featureImage && (
        <img
          src={blog.featureImage}
          alt={blog.title}
          className="w-full rounded-lg mb-10"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
