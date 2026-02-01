import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BLOGS ================= */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs/admin/getAllBlogs");
      let data = res.data;

      // Author sees only own blogs
      if (user.role === "author") {
        data = data.filter(
          (blog) => blog.author?._id === user._id
        );
      }

      setBlogs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= DELETE BLOG ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/delete/${id}`);
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  //PREVIEW  Blog
  const handlePreview = (slug) => {
    window.open(`http://localhost:3000/blog/${slug}`, "_blank");
  };

  /*  Update EDIT */
  const handleEdit = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            All Blogs
          </h1>

          <button
            onClick={() => navigate("/blogs/create")}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
          >
            + Create Blog
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Views</th>
                <th className="p-3">Author</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {blog.title}
                  </td>

                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td className="p-3">{blog.views || 0}</td>

                  <td className="p-3">
                    {blog.author?.name || "—"}
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handlePreview(blog.slug)}
                        title="Preview"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={18} />
                      </button>

                      {(user.role === "superAdmin" ||
                        user.role === "author") && (
                        <button
                          onClick={() => handleEdit(blog._id)}
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={18} />
                        </button>
                      )}

                      {user.role === "superAdmin" && (
                        <button
                          onClick={() => handleDelete(blog._id)}
                          title="Delete"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
