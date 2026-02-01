"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }) {
  useEffect(() => {
    const viewed = sessionStorage.getItem(`viewed_${slug}`);

    if (!viewed) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/view/${slug}`,
        { method: "PATCH" }
      );
      sessionStorage.setItem(`viewed_${slug}`, "true");
    }
  }, [slug]);

  return null; 
}
