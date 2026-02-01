import { useSelector } from "react-redux";
import { FileText, Users, Eye, Clock } from "lucide-react";
import API from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
 const [blogsData, setBlogsData] = useState({
  total: 0,
  published: 0,
  drafts: 0,
  views: 0,
});

const getBlogs = async () => {
  try {
    const res = await API.get("/blogs/admin/getAllBlogs");

    const data = res.data; 
    console.log("Fetched blogs:", data);

      const totalViews = data.reduce(
      (sum, blog) => sum + (blog.views || 0),
      0
    );
    setBlogsData({
      total: data.length,
      published: data.filter((blog) => blog.status === "published").length,
      drafts: data.filter((blog) => blog.status === "draft").length,
      views: totalViews
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

useEffect(() => {
  getBlogs();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back{user ? `, ${user.name}` : ""}. Manage your blogs and content here.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <StatCard
            title="Total Blogs"
            value= {blogsData.total}
            icon={<FileText size={22} />}
          />

          <StatCard
            title="Published Blogs"
            value= {blogsData.published}
            icon={<Eye size={22} />}
          />

          <StatCard
            title="Drafts"
            value= {blogsData.drafts}
            icon={<Clock size={22} />}
          />

          <StatCard
            title="Total Views"
            value= {blogsData.views}
            icon={<Users size={22} />}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between">
              <span>New blog created: “How AI Is Changing Blogging”</span>
              <span className="text-gray-400">2 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span>Blog published: “SEO Tips for 2026”</span>
              <span className="text-gray-400">Yesterday</span>
            </li>
            <li className="flex justify-between">
              <span>Draft updated: “Next.js Performance Guide”</span>
              <span className="text-gray-400">2 days ago</span>
            </li>
          </ul>
        </div>

        {/* All Blogs CTA */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-start text-lg font-semibold text-gray-900">
                All Blogs
              </h2>
              <p className="text-sm text-gray-500">
                View and manage all blog posts
              </p>
            </div>

            <Link to="/dashboard/allBlogs"
              className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            >
              View Blogs
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;

/* ---------- Reusable Card ---------- */

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
