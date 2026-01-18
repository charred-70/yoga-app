import Link from 'next/link';
import React from 'react';
"use client";
import Image from "next/image";
import { useState } from "react";
import sad_peter from "../public/sad_peter.jpg";
import neutral_peter from "../public/neutral_peter.jpg";
import happy_peter from "../public/happy_peter.jpg";
let intervalId: string | number | NodeJS.Timeout | null | undefined;

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [imgSrc, setShrimpy] = useState(sad_peter);
  const [goFetch, setFetching] = useState(false);
  async function sendPose() {
    setClicked(true);
    const input = document.getElementById("poses") as HTMLSelectElement;
    if (!input) {
      return;
    }

    const pose = input.value;
    if (input == null) {
      return;
    }

    await fetch("http://127.0.0.1:8000/api/pose-checker", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pose }),
    });

    await fetch(`http://127.0.0.1:8000/api/start-stream`, { method: "POST" });
    setClicked(true);
  }

  async function stop() {
    setClicked(false);
    await fetch(`http://127.0.0.1:8000/api/stop-stream`, { method: "POST" });
  }
  async function get_accuracy() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/accuracy-score`, {
        method: "GET",
      });
      const data = await res.json();
      const accuracy = data.value;
      // const img = document.getElementById("shrimpImage") as HTMLImageElement;
      if (accuracy == 2) {
        setShrimpy(happy_peter);
      } else if (accuracy == 1) {
        setShrimpy(neutral_peter);
      } else if (accuracy == 0) {
        setShrimpy(sad_peter);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function toggleInterval() {
    if (intervalId) {
      console.log("trying to end interval");
      clearInterval(intervalId);
      intervalId = null;
    } else {
      console.log("trying to start interval");
      intervalId = setInterval(get_accuracy, 1000);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 font-sans">
      <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
              website name
            </div>
            <ul className="flex gap-8 list-none">
              <li>
                <a href="#home" className="text-gray-700 hover:text-pink-500 transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full">
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
              <span className="block bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-500 bg-clip-text text-transparent mt-2">
                Amazing Site
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Discover something wonderful with us and embark on an extraordinary journey.
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
                  src='/neutral.png'
                  width={500}
                  height={500}
                  alt='test'
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
<!--         <div>
          <select name="poses" id="poses">
            <option value="mountain">Mountain Pose</option>
            <option value="seal">Seal Pose</option>
            <option value="downwardDog">Downward Dog</option>
            <option value="frog">Frog Pose</option>
            <option value="tree">Tree Pose</option>
          </select>
        </div>
        <div className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
          <button
            onClick={() => {
              sendPose();
              toggleInterval();
            }}
            id="submitBtn"
          >
            Submit
          </button>
        </div>
        {clicked && (
          <div>
            {/* <img src="/window.svg"></img> */}
            <img src="http://127.0.0.1:8000/api/video-feed" alt="video feed" />
            <div className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
              <button
                onClick={() => {
                  stop();
                  toggleInterval();
                }}
              >
                Stop
              </button>
            </div>
          </div>
        )}
        <div>
          <Image id="shrimpyImage" src={imgSrc} alt="shrimpy image her" /> -->
        </div>
      </main>

      <footer className="w-full py-8 text-center bg-white/50 backdrop-blur-sm border-t border-pink-100">
        <p className="text-gray-600">footer</p>
      </footer>
    </div>
  );
}
