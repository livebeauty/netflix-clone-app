"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and Links */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/netflix logo.png"
                alt="Netflix"
                width={120}
                height={40}
                className="cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex space-x-6 ml-10">
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
              <Link href="/tv-shows" className="text-white hover:text-gray-300">
                TV Shows
              </Link>
              <Link href="/movies" className="text-white hover:text-gray-300">
                Movies
              </Link>
              <Link href="/latest" className="text-white hover:text-gray-300">
                Latest
              </Link>
              <Link href="/my-list" className="text-white hover:text-gray-300">
                My List
              </Link>
            </div>
          </div>

          {/* Right side: Search, Notifications, Profile */}
          <div className="flex items-center space-x-8">
            <button className="text-white hover:text-gray-300">
              <CiSearch className="w-6 h-6" />
            </button>

            <button className="text-white hover:text-gray-300">
              <IoNotificationsOutline className="w-6 h-6" />
            </button>

            {/* Profile Button - Redirects to Profile Page */}
            <Link href="/profile">
              <Image
                src="/avatar1.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-lg cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
