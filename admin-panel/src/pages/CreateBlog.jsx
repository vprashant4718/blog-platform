import { useState } from "react";
import { FileText, Image as ImageIcon, Save, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import API from "../utils/api";
import Editor from "../Components/Editor_Blog";
import { uploadToCloudinary } from "../Components/UploadToCloudinary";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    featureImage: "",
    category: "",
    tags: "",
  });

  const {
    title,
    content,
    metaTitle,
    metaDescription,
    featureImage,
    category,
    tags,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    toast.info("Uploading image...");

    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData({ ...formData, featureImage: imageUrl });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, featureImage: "" });
    toast.info("Image removed");
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Validation
    if (!title.trim())
      return toast.warning("Blog title is required");

    if (!content || content.trim().length < 20)
      return toast.warning("Blog content is too short");

    if (!featureImage)
      return toast.warning("Feature image is required");

    if (!metaTitle.trim() || !metaDescription.trim())
      return toast.warning("SEO fields are required");

    setLoading(true);

    try {
      await API.post("/blogs/create", {
        title,
        content,
        metaTitle,
        metaDescription,
        featureImage,
        categories: [category],
        tags: tags.split(",").map((t) => t.trim()),
      });

      toast.success("Blog published successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to create blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Blog Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="title"
                value={title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Enter blog title"
              />
            </div>
          </div>

          {/* Feature Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Feature Image
            </label>

            {!featureImage ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center relative">
                {imageUploading ? (
                  <div className="flex flex-col items-center text-blue-600">
                    <Loader2 className="animate-spin mb-2" size={32} />
                    Uploading...
                  </div>
                ) : (
                  <>
                    <ImageIcon className="mx-auto mb-2 text-gray-400" size={40} />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="relative">
                <img
                  src={featureImage}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Blog Content
            </label>
            <Editor
              value={content}
              onChange={(val) =>
                setFormData({ ...formData, content: val })
              }
            />
          </div>

          {/* Category & Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Category"
              className="p-2 border rounded-lg"
            />
            <input
              name="tags"
              value={tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="p-2 border rounded-lg"
            />
          </div>

          {/* SEO */}
          <div className="bg-gray-50 p-4 rounded-lg border space-y-3">
            <h3 className="font-semibold">SEO Settings</h3>
            <input
              name="metaTitle"
              value={metaTitle}
              onChange={handleChange}
              placeholder="Meta Title"
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              name="metaDescription"
              value={metaDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              rows={2}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading || imageUploading}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white bg-gray-900 disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
