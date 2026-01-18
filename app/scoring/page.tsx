"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import shrimpy_happy from "../../public/shrimpHappy.png";
import shrimpy_sad from "../../public/shrimpSad.png";
import shrimpy_neutral from "../../public/neutral.png";
let intervalId: string | number | NodeJS.Timeout | null | undefined;

export default function ScoringPage() {
  // use state variable to set shrimpy image
  const [imgSrc, setShrimpy] = useState(shrimpy_neutral);
  const [timeEnd, setTimeEnd] = useState(false);

  // function to repeatedly fetch accuracy score
  // and updates the shrimpy image
  async function get_accuracy() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/accuracy-score`, {
        method: "GET",
      });
      const data = await res.json();
      const accuracy = data.value;
      if (accuracy == 2) {
        setShrimpy(shrimpy_happy);
      } else if (accuracy == 1) {
        setShrimpy(shrimpy_neutral);
      } else if (accuracy == 0) {
        setShrimpy(shrimpy_sad);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function get_advice() {
    const r = await fetch("http://127.0.0.1:8000/api/advice", {
      method: "GET",
    });
    const adviceData = await r.json();
    console.log("Advice: ", adviceData.advice);
    speakAdvice(adviceData.advice);
  }
  async function speakAdvice(advice: string) {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(advice);
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("text to speech is not supported for some reason idk man..");
    }
  }

  // starts the interval that constantly calls get_accuracy
  // every 2 secs
  intervalId = setInterval(get_accuracy, 1000);
  console.log("starting interval rn");

  // turns the function that constantly fetches
  // the accuracy score off
  function toggleIntervalOff() {
    if (intervalId) {
      console.log("trying to end interval");
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  async function stop() {
    await fetch(`http://127.0.0.1:8000/api/stop-stream`, { method: "POST" });
  }
  return (
    <>
      <Link href="/routines">
        <button
          className="px-8 py-4 bg-pink-400 
                  text-white rounded-full font-semibold
                  hover:bg-pink-500 transition-colors shadow-lg
                  fixed top-4 left-4"
          onClick={() => {
            stop();
            toggleIntervalOff();
          }}
        >
          Back
        </button>
      </Link>
      <div className="flex flex-row min-h-screen items-center justify-center bg-linear-to-br from-sky-50 via-pink-50 to-purple-50 font-sans dark:bg-zinc-100">
        <div className="flex flex-row w-full max-w-7xl mx-auto bg-pink-300 p-8 rounded-lg shadow-lg mb-15 mt-20">
          <div className="relative w-full h-200 rounded overflow-hidden bg-white">
            <img
              src="http://127.0.0.1:8000/api/video-feed"
              alt="test"
              className="video feed"
            />
          </div>
        </div>
        <div className="relative bg-white-500/10 p-7 rounded-3xl hover:shadow-pink-200 transition-shadow duration-500">
          <Image
            src={imgSrc}
            alt="shrimpy image here"
            className="relative z-10"
          />
        </div>
        <div>
          <button onClick={get_advice}>Get Advice</button>
        </div>
        {timeEnd && (
          <p className="text-3xl font-bold text-red-600 ml-8">Time's Up!</p>
        )}
      </div>
    </>
  );
}
