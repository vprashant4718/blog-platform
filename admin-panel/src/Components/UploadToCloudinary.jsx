export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const cloudName = "dmhxmwlnq"; // Your Cloud Name
  const uploadPreset = "blog-platform"; // Your Unsigned Upload Preset Name

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || "Upload failed");
    }

    const data = await res.json();
    return data.secure_url; // Returns the image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};