import React from 'react'

function Footer() {
  return (
   <footer className="bg-gray-900 text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-14">
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      
      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Real<span className="text-blue-500">Blogs</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          Real Blogs is a All type of blog sharing Website, real  experience, modern  technologies,
          and career guidance.
        </p>
      </div>

     

      

      {/* Social / Info */}
      <div>
        <h3 className="text-white font-semibold mb-4">Connect</h3>
        <p className="text-sm text-gray-400 mb-4">
          Learn, build, and grow with real-world content.
        </p>

       
      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Real Blogs. All rights reserved.
    </div>

  </div>
</footer>

  )
}

export default Footer