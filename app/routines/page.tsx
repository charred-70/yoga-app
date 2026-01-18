"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function RoutinePage() {
    const [selectedPoses, setSelectedPoses] = useState<number[]>([]);
    const poses = [
        { id: 1, name: "Mountain Pose", image: "/test.png" },
        { id: 2, name: "Downward Dog", image: "/test.png" },
        { id: 3, name: "Warrior Pose", image: "/test.png" },
        { id: 4, name: "Tree Pose", image: "/test.png" },
        { id: 5, name: "Child's Pose", image: "/test.png" }
    ];

    const togglePose = (poseId: number) => {
        setSelectedPoses(prev =>
            prev.includes(poseId)
                ? prev.filter(id => id !== poseId)
                : [...prev, poseId]
        );
    };

    return (
        <>
            <div className="flex flex-col min-h-screen items-center bg-gradient-to-t from-pink-100 to-white font-sans pt-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-700 mb-20">
                    Select your poses !
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                    {poses.map((pose) => (
                        <div
                            key={pose.id}
                            onClick={() => togglePose(pose.id)}
                            className={`relative cursor-pointer p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ${selectedPoses.includes(pose.id)
                                ? 'bg-pink-300 ring-4 ring-pink-400'
                                : 'bg-pink-300'
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
                        <Link href="/scoring">
                            <button
                                className="bg-gradient-to-br from-stone-300 to-pink-400 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full bottom-4 right-4 shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2 text-lg"
                            >
                                <Check size={24} />
                                Begin with {selectedPoses.length} {selectedPoses.length === 1 ? 'Pose' : 'Poses'} in your Routine
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}