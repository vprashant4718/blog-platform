import { notFound } from "next/navigation";
import ViewTracker from "./ViewTracker";
import Link from "next/link";
import RelatedBlogs from "../_components/RelatedBlogs";
import FAQ from "../_components/FAQ";

// Fetch single blog
async function getBlog(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: [blog.featureImage],
      type: "article",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/blog/${blog.slug}`,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return notFound();
  // console.log("Blog data:", blog);
  const seoSchema = {
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
    <article className="max-w-3xl mx-auto px-6 py-12 pt-24">
      {/* View counter (client-only) */}
      <ViewTracker slug={blog.slug} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
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
      
      <FAQ faqs={blog.faq} />
      <RelatedBlogs blog={blog}  />
      
    </article>
  );
}
