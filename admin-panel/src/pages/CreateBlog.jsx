import { useState } from "react";
import { FileText, Image as ImageIcon, Save, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import API from "../utils/api";
import EditorBlog from "../Components/Editor_Blog";
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
    faq: [{ question: "", answer: "" }],
    internalLinks: [{ title: "", url: "" }],
    externalLinks: [{ title: "", url: "" }],
  });

  const {
    title,
    content,
    metaTitle,
    metaDescription,
    featureImage,
    category,
    tags,
    faq,
    internalLinks,
    externalLinks,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    toast.info("Uploading image...");

    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData({ ...formData, featureImage: imageUrl });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, featureImage: "" });
  };

  /* ================= FAQ ================= */
  const handleFaqChange = (i, field, value) => {
    const updated = [...faq];
    updated[i][field] = value;
    setFormData({ ...formData, faq: updated });
  };

  const addFaq = () =>
    setFormData({
      ...formData,
      faq: [...faq, { question: "", answer: "" }],
    });

  const removeFaq = (i) =>
    setFormData({
      ...formData,
      faq: faq.filter((_, index) => index !== i),
    });

  /* ================= LINKS ================= */
  const handleLinkChange = (type, i, field, value) => {
    const updated = [...formData[type]];
    updated[i][field] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const addLink = (type) =>
    setFormData({
      ...formData,
      [type]: [...formData[type], { title: "", url: "" }],
    });

  const removeLink = (type, i) =>
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, index) => index !== i),
    });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (status) => {
    // e.preventDefault();
    console.log(status);
    if (!title.trim()) return toast.warning("Title is required");
    if (!content || content.length < 30)
      return toast.warning("Content too short");
    if (!featureImage) return toast.warning("Feature image required");
    if (!metaTitle || !metaDescription)
      return toast.warning("SEO fields required");

    setLoading(true);

    try {
      await API.post("/blogs/create", {
        title,
        content,
        metaTitle,
        metaDescription,
        featureImage,
        categories: category.split(",").map((c) => c.trim()),
        tags: tags.split(",").map((t) => t.trim()),
        faq: faq.filter((f) => f.question && f.answer),
        internalLinks: internalLinks.filter((l) => l.title && l.url),
        externalLinks: externalLinks.filter((l) => l.title && l.url),
        status
      });

      toast.success("Blog published successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

        <form  className="space-y-6">
          {/* TITLE */}
          <input
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full p-3 border rounded-lg"
          />

          {/* IMAGE */}
          {!featureImage ? (
            <div className="border-2 border-dashed p-6 rounded-lg text-center relative">
              {imageUploading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  <ImageIcon className="mx-auto mb-2 text-gray-400" size={40} />
                  <p>Upload feature image</p>
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
              <img src={featureImage} className="rounded-lg" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* CONTENT */}
          <EditorBlog
            value={content}
            onChange={(val) =>
              setFormData({ ...formData, content: val })
            }
          />

          {/* CATEGORY & TAGS */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Categories (comma separated)"
              className="p-2 border rounded"
            />
            <input
              name="tags"
              value={tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="p-2 border rounded"
            />
          </div>

          {/* SEO */}
          <input
            name="metaTitle"
            value={metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
            className="p-2 border rounded w-full"
          />
          <textarea
            name="metaDescription"
            value={metaDescription}
            onChange={handleChange}
            placeholder="Meta Description"
            className="p-2 border rounded w-full"
          />

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="font-semibold">FAQs</h3>
            {faq.map((f, i) => (
              <div key={i} className="space-y-2">
                <input
                  placeholder="Question"
                  value={f.question}
                  onChange={(e) =>
                    handleFaqChange(i, "question", e.target.value)
                  }
                  className="p-2 border rounded w-full"
                />
                <textarea
                  placeholder="Answer"
                  value={f.answer}
                  onChange={(e) =>
                    handleFaqChange(i, "answer", e.target.value)
                  }
                  className="p-2 border rounded w-full"
                />
                {faq.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    className="text-red-500 text-sm"
                  >
                    Remove FAQ
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFaq} className="text-blue-600">
              + Add FAQ
            </button>
          </div>
            {/* INTERNAL LINKS */}
<div className="border rounded-lg p-4 space-y-4">
  <h3 className="font-semibold text-gray-800">Internal Links</h3>

  {internalLinks.map((link, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
      <input
        type="text"
        placeholder="Link Title (e.g. Best AI Tools)"
        value={link.title}
        onChange={(e) =>
          handleLinkChange("internalLinks", index, "title", e.target.value)
        }
        className="p-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="/blogs/best-ai-tools"
        value={link.url}
        onChange={(e) =>
          handleLinkChange("internalLinks", index, "url", e.target.value)
        }
        className="p-2 border rounded-lg"
      />

      {internalLinks.length > 1 && (
        <button
          type="button"
          onClick={() => removeLink("internalLinks", index)}
          className="text-sm text-red-500 col-span-full text-left"
        >
          Remove internal link
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={() => addLink("internalLinks")}
    className="text-blue-600 text-sm"
  >
    + Add Internal Link
  </button>
</div>

          {/* SUBMIT */}
        <div className="flex items-center justify-center gap-5">  
          <button type="button"
            disabled={loading}
            className="w-28 bg-gray-300 text-black py-3 rounded-lg border border-dashed cursor-pointer"
            onClick={()=> handleSubmit("draft")}
          >
            {loading ? "Drafting..." : "+ Draft Blog"}
          </button>
          <button type="button"
            disabled={loading}
            className="w-72 bg-gray-900 text-white py-3 rounded-lg cursor-pointer"
            onClick={()=>handleSubmit("published")}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
