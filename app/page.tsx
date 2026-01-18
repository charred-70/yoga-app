import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-sky-50 font-sans dark:bg-zinc-100">
      <nav className="w-full bg-gradient-to-r from-pink-200 to-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              website name
            </div>
            <ul className="flex gap-8 list-none">
              <li>
                <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center pt-20 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 max-w-7xl w-full">
          <div className="flex flex-col lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              Welcome to Our Amazing Site
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mt-4">
              Discover something wonderful with us.
            </p>
            <Link href="/routines">
              <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg mt-6">
                Get Started
              </button>
            </Link>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src='/test.png'
              width={500}
              height={500}
              alt='test'
            />
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center bg-white">
        footer
      </footer>
    </div>
  );
}
