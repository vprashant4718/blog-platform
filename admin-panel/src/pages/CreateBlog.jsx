import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FileText, Image, Tag, Layers, Save } from "lucide-react";
import API from "../utils/api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/blogs", {
        title,
        content,
        metaTitle,
        metaDescription,
        featureImage,
        tags: tags.split(",").map(t => t.trim()),
        categories: categories.split(",").map(c => c.trim())
      });

      alert("Blog created successfully");
      setTitle("");
      setContent("");
      setMetaTitle("");
      setMetaDescription("");
      setFeatureImage("");
      setTags("");
      setCategories("");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl bg-white rounded-xl shadow-md p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Blog
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Write SEO-optimized content for your platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <div className="relative">
              <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <div className="rounded-lg overflow-hidden border border-gray-300">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              SEO Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  placeholder="Meta title (max 60 characters)"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  placeholder="Meta description (max 160 characters)"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Media & Taxonomy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature Image URL
              </label>
              <div className="relative">
                <Image size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={featureImage}
                  onChange={(e) => setFeatureImage(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="relative">
                <Tag size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="ai, seo, blogging"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div className="relative">
                <Layers size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="technology, ai"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


export default CreateBlog;