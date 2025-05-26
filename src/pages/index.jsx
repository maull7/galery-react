import '../App.css'
import Navbar from '../components/navbar'
import Card from '../components/galeri/card'
import { useEffect, useState } from 'react'
import { getGallery } from '../api/api'

function Index() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("nature");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true); // 👈 loading state

  const perPage = 12;

  const categories = [
    "nature", "technology", "animals", "people", "sports",
    "travel", "food", "mountain", "sunset", "sunrise"
  ];

  useEffect(() => {
    setLoading(true); // ⏳ mulai loading
    getGallery(search, perPage, page).then((results) => {
      setPhotos(results.photos);
      setTotalResults(results.totalResults);
      setLoading(false); // ✅ selesai loading
    });
  }, [search, page]);

  const totalPages = Math.ceil(totalResults / perPage);

  const handleCategoryClick = (category) => {
    setSearch(category);
    setPage(1); // 🔁 reset ke halaman 1 saat kategori berubah
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-blue-50 min-h-screen pt-16">
        <div className="container mx-auto pt-12">

          <div className="text-center mb-8">
            <h4 className="text-4xl font-bold text-blue-700 tracking-wide drop-shadow-sm">
              Select Photos
            </h4>
            <p className="text-gray-500 mt-2 text-sm">
              Choose a category to explore beautiful images
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 justify-center items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition duration-200 transform 
                  hover:scale-105 
                  ${
                    search === category
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Section */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="ml-4 text-blue-600 font-medium">Loading photos...</p>
            </div>
          ) : (
            <>
              <div className="p-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    image={photo.src.medium}
                    alt={photo.alt}
                    id={photo.id}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || loading}
                  className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page >= totalPages || loading}
                  className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
