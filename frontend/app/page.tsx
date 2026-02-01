import Link from "next/link";
import './globals.css';
import BlogCard from "./_components/BlogCard";

// Server-side fetch (correct)
async function getBlogs() {
  try { 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/getAllBlogs`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
} catch (error) {
  console.error("Error fetching blogs:", error);
  return [];
}
}


export default async function Home() {
  const blogs = await getBlogs();
  console.log("blogs:", blogs);

  return (
    <main className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Latest Tech Blogs
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore in-depth articles on full stack development, modern web
            technologies, career guides, and best practices for developers.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
