import Link from "next/link";
import './globals.css';
// Server-side fetch (correct)
async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/getAllBlogs`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();

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
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Feature Image */}
                {blog.featureImage && (
                  <img
                    src={blog.featureImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5 flex flex-col h-full">
                  
                  {/* Category */}
                  {blog.categories?.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {blog.categories[0]}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 leading-snug">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {blog.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                    {blog.metaDescription}
                  </p>

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {blog.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-5 flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {blog.author?.name || "Admin"}
                    </span>
                    <span>
                      {new Date(blog.createdAt).toDateString()}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    Read full article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
