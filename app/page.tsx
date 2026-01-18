"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-sky-50 via-pink-50 to-purple-50 font-sans">
      <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
              website name
            </div>
            <ul className="flex gap-8 list-none">
              <li>
                <a
                  href="#home"
                  className="text-gray-700 hover:text-pink-500 transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20 max-w-7xl w-full">
          <div className="flex flex-col lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Welcome to Our
              <span className="block bg-linear-to-r from-pink-400 via-purple-300 to-indigo-500 bg-clip-text text-transparent mt-2">
                Amazing Site
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Discover something wonderful with us and embark on an
              extraordinary journey.
            </p>

            <div className="flex gap-4 pt-4">
              <Link href="/routines">
                <button className="px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                  Get Started
                </button>
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-pink-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

              <div className="relative bg-white-500/10 p-8 rounded-3xl hover:shadow-pink-200 transition-shadow duration-500">
                <Image
                  src="/neutral.png"
                  width={500}
                  height={500}
                  alt="test"
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center bg-white/50 backdrop-blur-sm border-t border-pink-100">
        <p className="text-gray-600">footer</p>
      </footer>
    </div>
  );
}
