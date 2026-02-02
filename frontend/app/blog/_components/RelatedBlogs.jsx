import Link from 'next/link'
import React from 'react'

export default function RelatedBlogs(blog) {
  return (
   <div className="mt-20">
  {/* Section Heading */}
  <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
    See Related Blogs 👇
  </h3>

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {blog.blog.internalLinks.map((link, index) => (
      <Link
        key={index}
        href={link.url}
        className="group bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition"
      >
        {/* Image
        <div className="h-40 w-full overflow-hidden">
          <img
            src={link.image || "/blog-placeholder.jpg"}
            alt={link.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div> */}

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {link.title}
          </h4>

          <p className="text-sm text-gray-500 line-clamp-2">
            Read more about this topic and explore related insights.
          </p>

          <span className="mt-2 text-sm font-medium text-blue-600">
            Read Article →
          </span>
        </div>
      </Link>
    ))}
  </div>
</div>

  )
}
