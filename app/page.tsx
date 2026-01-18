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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div>
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
          <Image id="shrimpyImage" src={imgSrc} alt="shrimpy image her" />
        </div>
      </main>
    </div>
  );
}
