import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image as ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import API from "../utils/api";
import EditorBlog from "../Components/Editor_Blog";
import { uploadToCloudinary } from "../Components/UploadToCloudinary";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
    status: "draft",
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

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/admin/getAllBlogs/${id}`);
        const blog = res.data[0]; // Assuming the API returns an array

        setFormData({
          title: blog.title,
          content: blog.content,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          featureImage: blog.featureImage,
          category: blog.categories.join(", "),
          tags: blog.tags.join(", "),
          faq: blog.faq.length ? blog.faq : [{ question: "", answer: "" }],
          internalLinks: blog.internalLinks.length
            ? blog.internalLinks
            : [{ title: "", url: "" }],
          externalLinks: blog.externalLinks.length
            ? blog.externalLinks
            : [{ title: "", url: "" }],
          status: blog.status,
        });

        setInitialLoading(false);
      } catch (err) {
        toast.error("Failed to load blog");
        navigate("/dashboard/allBlogs");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  /* ================= COMMON HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= IMAGE ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    toast.info("Uploading image...");

    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, featureImage: url });
      toast.success("Image updated");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () =>
    setFormData({ ...formData, featureImage: "" });

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
      faq: faq.filter((_, idx) => idx !== i),
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
      [type]: formData[type].filter((_, idx) => idx !== i),
    });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (status) => {
    if (!title.trim()) return toast.warning("Title is required");
    if (!content || content.length < 30)
      return toast.warning("Content too short");
    if (!featureImage) return toast.warning("Feature image required");
    if (!metaTitle || !metaDescription)
      return toast.warning("SEO fields required");

    setLoading(true);

    try {
      await API.put(`/blogs/update/${id}`, {
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
        status,
      });

      toast.success(
        status === "published" ? "Blog updated & published" : "Draft saved"
      );
      navigate("/dashboard/allBlogs");
    } catch (err) {
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  /* ================= UI ================= */
 return (
  <div className="min-h-screen p-6 bg-gray-50">
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

      {/* ================= TITLE ================= */}
      <input
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* ================= IMAGE ================= */}
      {!featureImage ? (
        <div className="border-2 border-dashed p-6 rounded-lg text-center relative mb-6">
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
        <div className="relative mb-6">
          <img src={featureImage} className="rounded-lg w-full" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <EditorBlog
        value={content}
        onChange={(val) =>
          setFormData({ ...formData, content: val })
        }
      />

      {/* ================= CATEGORY & TAGS ================= */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
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

      {/* ================= SEO ================= */}
      <div className="mt-6 space-y-3">
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
          rows={3}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* ================= FAQ ================= */}
      <div className="mt-8 space-y-4">
        <h3 className="font-semibold text-lg">FAQs</h3>

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

        <button
          type="button"
          onClick={addFaq}
          className="text-blue-600 text-sm"
        >
          + Add FAQ
        </button>
      </div>

      {/* ================= INTERNAL LINKS ================= */}
      <div className="mt-8 space-y-4">
        <h3 className="font-semibold text-lg">Internal Links</h3>

        {internalLinks.map((link, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Link Title"
              value={link.title}
              onChange={(e) =>
                handleLinkChange("internalLinks", i, "title", e.target.value)
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="/blogs/example"
              value={link.url}
              onChange={(e) =>
                handleLinkChange("internalLinks", i, "url", e.target.value)
              }
              className="p-2 border rounded"
            />
            {internalLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink("internalLinks", i)}
                className="text-red-500 text-sm col-span-full"
              >
                Remove link
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

      {/* ================= EXTERNAL LINKS ================= */}
      <div className="mt-8 space-y-4">
        <h3 className="font-semibold text-lg">External Links</h3>

        {externalLinks.map((link, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Link Title"
              value={link.title}
              onChange={(e) =>
                handleLinkChange("externalLinks", i, "title", e.target.value)
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="https://example.com"
              value={link.url}
              onChange={(e) =>
                handleLinkChange("externalLinks", i, "url", e.target.value)
              }
              className="p-2 border rounded"
            />
            {externalLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink("externalLinks", i)}
                className="text-red-500 text-sm col-span-full"
              >
                Remove link
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => addLink("externalLinks")}
          className="text-blue-600 text-sm"
        >
          + Add External Link
        </button>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-center gap-5 mt-10">
        <button
          disabled={loading}
          onClick={() => handleSubmit("draft")}
          className="w-32 bg-gray-300 py-3 rounded-lg"
        >
          Save Draft
        </button>
        <button
          disabled={loading}
          onClick={() => handleSubmit("published")}
          className="w-64 bg-gray-900 text-white py-3 rounded-lg"
        >
          Update & Publish
        </button>
      </div>
    </div>
  </div>
);
};

export default UpdateBlog;
