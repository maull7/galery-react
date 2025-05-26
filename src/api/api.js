import axios from "axios";

// Fungsi async untuk ambil data galeri dari Pexels
export const getGallery = async (query
, perPage = 20,page = 1) => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search`, {
      params: {
        query: query,
        per_page: perPage,
        page : page
      },
      headers: {
        Authorization:"B2Ys3XyRbdonPbkmoz9E0Z7pr4irifpqvnUvPDI0nHU2qAJj9uyNPADB"
      }
    });

    console.log({gallery : response})
    return {
      photos: response.data.photos,
      totalResults: response.data.total_results
    };
  } catch (error) {
    console.error("Gagal ambil data galeri:", error);
    return [];
  }
};
