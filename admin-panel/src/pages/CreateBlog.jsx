import { useState } from "react";
import { FileText, Image as ImageIcon, Save, X, Loader2 } from "lucide-react";
import API from "../utils/api";
import Editor from "../Components/Editor_Blog"; 
// Import the separated utility function
import { uploadToCloudinary } from "../Components/UploadToCloudinary"; 

const CreateBlog = () => {
  const [loading, setLoading] = useState(false); // For form submission
  const [imageUploading, setImageUploading] = useState(false); // For image upload only

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    featureImage: "",
    category: "",
    tags: ""
  });

  const { title, content, metaTitle, metaDescription, featureImage, category, tags } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setFormData({ ...formData, featureImage: imageUrl });
      }
    } catch (error) {
      alert("Image upload failed. Check console.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, featureImage: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/blogs/create", {
        title,
        content,
        metaTitle,
        metaDescription,
        featureImage,
        categories: [category],
        tags: tags.split(",").map(t => t.trim())
      });

      alert("Blog created successfully");
    } catch (err) {
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="title"
                value={title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter blog title"
                required
              />
            </div>
          </div>

          {/* Feature Image Upload (The Fixed Part) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feature Image</label>
            
            {!featureImage ? (
              // Upload Area
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative">
                
                {imageUploading ? (
                   <div className="flex flex-col items-center text-blue-600">
                      <Loader2 className="animate-spin mb-2" size={32} />
                      <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                   </div>
                ) : (
                  <>
                    <ImageIcon className="text-gray-400 mb-2" size={40} />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>
                    
                    {/* The Hidden Input */}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            ) : (
              // Image Preview Area
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={featureImage} 
                  alt="Feature Preview" 
                  className="w-full h-64 object-cover" 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-md"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <div className="prose-editor border rounded-lg overflow-hidden min-h-[300px]">
                {/* Assuming your Editor handles its own height/styling */}
                <Editor
                  value={content}
                  onChange={(val) => setFormData({ ...formData, content: val })}
                />
            </div>
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                    name="category"
                    value={category}
                    onChange={handleChange}
                    placeholder="e.g. Technology"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                    name="tags"
                    value={tags}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Web (comma separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
             <h3 className="font-semibold text-gray-700">SEO Settings</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="metaTitle"
                  value={metaTitle}
                  onChange={handleChange}
                  placeholder="Meta Title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  name="metaDescription"
                  value={metaDescription}
                  onChange={handleChange}
                  placeholder="Meta Description"
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                />
             </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || imageUploading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition
              ${loading || imageUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
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