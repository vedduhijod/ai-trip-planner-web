import { useState, useEffect } from "react";
import axios from "axios";

export const useImageFetch = (query) => {
  const [image, setImage] = useState("/placeholder.jpeg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, per_page: 1 },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
            },
          }
        );
        const imgUrl = response.data.results[0]?.urls?.regular;
        if (imgUrl) setImage(imgUrl);
      } catch (err) {
        console.error("Failed to fetch image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query]);

  return { image, loading };
};
