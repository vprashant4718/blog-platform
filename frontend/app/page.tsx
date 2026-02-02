import Link from "next/link";
import './globals.css';
import BlogCard from "./_components/BlogCard";


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
  // console.log("blogs:", blogs);

  return (
    <main className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
     <div className="bg-gradient-to-b from-gray-50 to-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-20 text-center">
    
    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
      Real-World Blogs
    </h1>

    {/* Subtitle */}
    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Discover Real Blogs Real Information, Modern Blogs, Best Blog Website, career growth — written from
      real experience, not theory.
    </p>

    {/* Highlights */}
    <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-xl">🧑‍💻</span>
        All Type of Blogs
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">⚙️</span>
        Real News
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">📈</span>
        Career & Growth
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">🧠</span>
        Clean Architecture
      </div>
    </div>
  </div>
</div>


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
