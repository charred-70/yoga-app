import Link from 'next/link';
import React from 'react';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-sky-50 font-sans dark:bg-zinc-100">
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
      <div className="flex flex-row">
        <div className="flex flex-col text-sky-500 h-64">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            Welcome to Our Amazing Site
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Discover something wonderful with us.
          </p>
        </div>
        <div className="text-sky-500">image stuff</div>
      </div>
      <Link href="/routines">
        <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg">
          Get Started
        </button>
      </Link>
      <section className="">footer</section>
    </div>
  );
}
