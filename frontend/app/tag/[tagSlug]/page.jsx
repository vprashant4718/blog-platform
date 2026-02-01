import BlogCard from "../../_components/BlogCard";


async function getTagBlogs(tagSlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/getAllBlogs?tag=${encodeURIComponent(tagSlug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export async function generateMetadata({ params }) {
  const { tagSlug } = await params;
  const tagName = decodeURIComponent(tagSlug);

  return {
    title: `Posts tagged "${tagName}"`,
    description: `Explore all blog posts related to ${tagName}.`,
  };
}

export default async function TagPage({ params }) {
  const { tagSlug } = await params;
  const tagName = decodeURIComponent(tagSlug);

  const blogs = await getTagBlogs(tagSlug);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Tag: #{tagName}
      </h1>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No posts found with this tag.
        </p>
      )}
    </div>
  );
}
