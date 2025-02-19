import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const tmdbApi = {
  fetchNetflixOriginals: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/tv`, {
        params: { api_key: API_KEY, language: "en-US", with_networks: 213 }, // 213 is for Netflix Originals
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Netflix Originals:", error);
      return null;
    }
  },
  
  fetchTrending: async () => {
    const response = await axios.get(`${BASE_URL}/trending/all/week`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    return response.data;
  },

  fetchTopRated: async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    return response.data;
  },

  fetchPopularMovies: async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    return response.data;
  },

  fetchActionMovies: async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", with_genres: 28 },
    });
    return response.data;
  },

  fetchComedyMovies: async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", with_genres: 35 },
    });
    return response.data;
  },

  fetchHorrorMovies: async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", with_genres: 27 },
    });
    return response.data;
  },

  fetchRomanceMovies: async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", with_genres: 10749 },
    });
    return response.data;
  },

  fetchDocumentMovies: async () => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY, language: "en-US", with_genres: 99 },
    });
    return response.data;
  },
};

export default tmdbApi;
