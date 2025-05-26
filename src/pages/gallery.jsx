import '../App.css'
import Navbar from '../components/navbar'
import Card from '../components/galeri/card'
import { useEffect, useState } from 'react'

function Gallery() {
  const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("lovedPhotos")) || [];
  setFavorites(saved);
}, []);


  return (
    <>
      <Navbar />
      <div className="w-full bg-blue-50 min-h-screen pt-16">
        <div className="container mx-auto pt-12">

          <div className="text-center mb-8">
            <h4 className="text-4xl font-bold text-blue-700 tracking-wide drop-shadow-sm">
              Your Galleries
            </h4>
            <p className="text-gray-500 mt-2 text-sm">
              These are the photos you ❤️ liked
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">You haven't liked any photos yet.</p>
            </div>
          ) : (
            <div className="p-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {favorites.map((photo) => (
                <Card
                  key={photo.id}
                  image={photo.image}
                  alt={photo.alt}
                  id={photo.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;
