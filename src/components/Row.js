"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUrl(); // Ensure fetchUrl() is awaited
        setMovies(response?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="px-4">
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={isLargeRow ? 5 : 6}
        navigation
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: isLargeRow ? 4 : 5 },
          1280: { slidesPerView: isLargeRow ? 5 : 6 },
        }}
        className="cursor-pointer"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {movie.poster_path || movie.backdrop_path ? (
              <Image
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name || movie.title || "Movie"}
                width={isLargeRow ? 180 : 300}
                height={isLargeRow ? 300 : 200}
                className="rounded-md transition-transform transform hover:scale-105"
                priority
              />
            ) : (
              <div className="w-[180px] h-[300px] bg-gray-700 rounded-md flex items-center justify-center">
                <p className="text-white">No Image</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
