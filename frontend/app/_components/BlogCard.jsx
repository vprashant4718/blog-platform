import Link from 'next/link';

export default function BlogCard({ blog }) { 
  return (
    <article
                key={blog._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Feature Image */}
                {blog.featureImage && (
                  <img
                    src={blog?.featureImage}
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
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Link href={`/tag/${tag}`} key={tag}>
                        <span
                          
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                          #{tag}
                        </span>
                          </Link>
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
  );
}