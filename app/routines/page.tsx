"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
let intervalId: string | number | NodeJS.Timeout | null | undefined;

export default function RoutinePage() {
  // selected poses is a number array
  const [selectedPoses, setSelectedPoses] = useState<number[]>([]);
  const poses = [
    { id: 1, name: "Mountain Pose", image: "/neutral.png", value: "mountain" },
    { id: 2, name: "Seal Pose", image: "/neutral.png", value: "seal" },
    {
      id: 3,
      name: "Downward Dog",
      image: "/neutral.png",
      value: "downwardDog",
    },
    { id: 4, name: "Frog Pose", image: "/neutral.png", value: "frog" },
    { id: 5, name: "Tree Pose", image: "/neutral.png", value: "tree" },
  ];

  const togglePose = (poseId: number) => {
    setSelectedPoses((prev) =>
      prev.includes(poseId)
        ? prev.filter((id) => id !== poseId)
        : [...prev, poseId],
    );
  };

  async function sendPose() {
    const input = selectedPoses[0];
    if (!input) {
      return;
    }

    const pose = poses[input - 1].value;
    if (input == null) {
      return;
    }

    await fetch("http://127.0.0.1:8000/api/pose-checker", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pose }),
    });

    await fetch(`http://127.0.0.1:8000/api/start-stream`, { method: "POST" });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen items-center bg-linear-to-t from-pink-100 to-white font-sans pt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-700 mb-20">
          Create your Routine !
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {poses.map((pose) => (
            <div
              key={pose.id}
              onClick={() => togglePose(pose.id)}
              className={`relative cursor-pointer p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ${
                selectedPoses.includes(pose.id)
                  ? "bg-pink-300 ring-4 ring-pink-400"
                  : "bg-pink-300"
              }`}
            >
              {selectedPoses.includes(pose.id) && (
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10">
                  <Check size={24} className="text-pink-500" />
                </div>
              )}

              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white">
                <Image
                  src={pose.image}
                  alt={pose.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <p className="text-xl sm:text-2xl text-stone-600 font-medium text-center mt-6">
                {pose.name}
              </p>
            </div>
          ))}
        </div>

        {selectedPoses.length > 0 && (
          <div className="flex justify-center">
            {/* This link wrapper thingy sends you to the page with the camera*/}
            <Link href="/scoring">
              <button
                className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-4 px-8 rounded-full bottom-4 right-4 shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2 text-lg"
                id="submitbtn"
                onClick={() => {
                  sendPose();
                }}
              >
                <Check size={24} />
                Begin with {selectedPoses.length}{" "}
                {selectedPoses.length === 1 ? "Pose" : "Poses"} in your Routine
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
