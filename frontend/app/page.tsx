import Link from 'next/link';

// 1. Fetch data directly in the Server Component (No useEffect needed in Next.js App Router!)
async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getAllBlogs`, { cache: 'no-store' });
  if (!res.ok) {
    console.log('Failed to fetch blogs');
  }
  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  console.log('Fetched Blogs:', blogs); 
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Tech Blogs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog:any) => (
          <div key={blog._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            {/* Feature Image */}
            {blog.featureImage && (
              <img src={blog.featureImage} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded" />
            )}
            
            {/* Title & Link */}
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600">
                {blog.title}
              </Link>
            </h2>
            
            {/* Short Description */}
            <p className="text-gray-600 mt-2 line-clamp-3">{blog.seo?.metaDescription}</p>
            
            <div className="mt-4 text-sm text-gray-500">
              By {blog.author?.name || 'Admin'} • {new Date(blog.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}