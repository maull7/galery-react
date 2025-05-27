import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Download,Loader2  } from "lucide-react";


const Card = ({ image,alt,id }) => {
 
  const [loved, setLoved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // ⬅️ new state

  // ▸ cek di localStorage begitu komponen mount / id berubah
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lovedPhotos")) || [];
    setLoved(saved.some((p) => p.id === id));
  }, [id]);

  /** Toggle love & sync ke localStorage */
  const toggleLove = () => {
    let saved = JSON.parse(localStorage.getItem("lovedPhotos")) || [];

    if (saved.some((p) => p.id === id)) {
      // ↳ kalau sudah ada → hapus
      saved = saved.filter((p) => p.id !== id);
      setLoved(false);
    } else {
       const photo = { id, image, alt }; // ← definisi photo!
      saved.push(photo);
      setLoved(true);
    }

    localStorage.setItem("lovedPhotos", JSON.stringify(saved));
  };

  const downloadImage = async () => {
    try {
      setIsDownloading(true); // ⬅️ mulai animasi
      const response = await fetch(image, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${alt || "download"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal download gambar:", error);
      alert("Gagal download gambar.");
    } finally {
      setIsDownloading(false); // ⬅️ selesai animasi
    }
  };



  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      {/* tombol love */}
     
      <button
        onClick={toggleLove}
        className={`absolute top-3 left-3 z-10 p-2 rounded-full border transition cursor-pointer
          ${loved
            ? "bg-pink-500 border-pink-500 text-white"
            : "bg-white border-pink-300 text-pink-500 hover:bg-pink-50"}`}
      >
        {/* lucide-react: Heart fill pakai currentColor biar ikut warna */}
        <Heart size={18} fill={loved ? "currentColor" : "none"} />
      </button>

       <button
        onClick={downloadImage}
        className={`absolute bottom-3 right-3 z-10 p-2 rounded-full bg-blue-100 border border-blue-700 text-blue-700 hover:bg-gray-50 transition cursor-pointer ${
          isDownloading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        title="Download image"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Download size={18} />
        )}
      </button>


      {/* gambar */}
      <img
        src={image}
        alt={alt}
        className="w-full h-60 object-cover select-none"
        loading="lazy"
      />
    </div>
  );
};

export default Card;
