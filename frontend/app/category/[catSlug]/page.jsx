import BlogCard from "../../_components/BlogCard";

async function getCategoryBlogs(catSlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/getAllBlogs?category=${encodeURIComponent(catSlug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}


export async function generateMetadata({ params }) {
  const { catSlug } = await params;
  const catName = decodeURIComponent(catSlug);

  return {
    title: `${catName} Blogs | My Tech Blog`,
    description: `Read the latest articles related to ${catName}.`,
    openGraph: {
      title: `${catName} Blogs`,
      description: `Articles and guides about ${catName}`,
    },
  };
}


export default async function CategoryPage({ params }) {
  const { catSlug } = await params;
  const catName = decodeURIComponent(catSlug);

  const blogs = await getCategoryBlogs(catName);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">
        Category: {catName}
      </h1>
      <p className="text-gray-500 mb-8">
        Found {blogs.length} article{blogs.length !== 1 && "s"}
      </p>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No blogs found in this category.
        </p>
      )}
    </div>
  );
}
