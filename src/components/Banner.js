"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import tmdbApi from "../api/tmdbApi";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const data = await tmdbApi.fetchNetflixOriginals();

      if (data?.results?.length) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      }
    };

    getMovies();
  }, []);

  // console.log(movie);
  

  // Function to truncate long text
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {movie && movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.name || movie?.title || "Netflix Banner"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="bg-black w-full h-full" /> // Placeholder to avoid errors
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-40 left-10 md:left-16 lg:left-24 text-white space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          {movie?.name || movie?.title || "Netflix Movie"}
        </h1>
        <p className="max-w-md text-sm md:text-lg text-gray-200">
          {truncate(movie?.overview, 200)}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-white text-black px-8 py-2 md:px-8 md:py-1 rounded font-bold text-lg flex items-center hover:bg-opacity-80 transition space-x-2">
            <FaPlay />
            <p>Play</p>
          </button>
          <button className="bg-gray-500 bg-opacity-60 text-white px-6 py-2 md:px-4 md:py-1 rounded font-bold text-lg flex items-center hover:bg-opacity-20 transition space-x-2">
            <IoIosInformationCircleOutline className="w-8 h-8" />
            <p>More Info</p>
          </button>
        </div>
      </div>
    </div>
  );
}