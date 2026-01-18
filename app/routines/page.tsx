"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

let intervalId: string | number | NodeJS.Timeout | null | undefined;

export default function RoutinePage() {
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
    if (!input) return;

    const pose = poses[input - 1].value;
    if (input == null) return;

    await fetch("http://127.0.0.1:8000/api/pose-checker", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pose }),
    });
    await fetch("http://127.0.0.1:8000/api/start-stream", { method: "POST" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-sky-50 font-sans">
      <div className="w-full pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-pink-500 via-purple-300 to-indigo-600 bg-clip-text text-transparent">
            Create your Routine!
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your favorite poses to create a personalized yoga routine.
          </p>
        </div>
      </div>

      {/* Poses Grid */}
      <div className="flex-1 px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {poses.map((pose) => (
            <div
              key={pose.id}
              onClick={() => togglePose(pose.id)}
              className={`group relative cursor-pointer rounded-3xl transition-all duration-300 transform hover:scale-105 ${
                selectedPoses.includes(pose.id)
                  ? "bg-linear-to-br from-red-300 to-pink-400 shadow-2xl shadow-pink-300"
                  : "bg-white hover:shadow-xl shadow-md"
              }`}
            >
              {/* Selection Indicator */}
              {selectedPoses.includes(pose.id) && (
                <div className="absolute -top-3 -right-3 bg-white rounded-full p-3 shadow-lg z-10 animate-bounce">
                  <Check size={24} className="text-red-300" />
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Image Container */}
                <div
                  className={`relative aspect-square w-full rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedPoses.includes(pose.id)
                      ? "bg-white ring-4 ring-white/50"
                      : "bg-gray-50 group-hover:bg-pink-50"
                  }`}
                >
                  <Image
                    src={pose.image}
                    alt={pose.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Pose Name */}
                <p
                  className={`text-xl font-semibold text-center transition-colors ${
                    selectedPoses.includes(pose.id)
                      ? "text-white"
                      : "text-gray-800 group-hover:text-pink-600"
                  }`}
                >
                  {pose.name}
                </p>
              </div>

              {/* Subtle gradient overlay on hover */}
              {!selectedPoses.includes(pose.id) && (
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-pink-400/0 to-purple-500/0 group-hover:from-pink-400/5 group-hover:to-purple-500/5 transition-all duration-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      {selectedPoses.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
          <Link href="/scoring">
            <button
              onClick={sendPose}
              className="group bg-linear-to-r from-red-300 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold py-5 px-10 rounded-full shadow-2xl shadow-pink-300 transform transition-all duration-300 hover:scale-110 flex items-center gap-3 text-lg backdrop-blur-sm"
            >
              <div className="bg-white/20 rounded-full p-2">
                <Check
                  size={24}
                  className="group-hover:rotate-12 transition-transform"
                />
              </div>
              <span>
                Begin with {selectedPoses.length}{" "}
                {selectedPoses.length === 1 ? "Pose" : "Poses"}
              </span>
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                {selectedPoses.length}
              </div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
