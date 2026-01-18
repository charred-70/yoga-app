import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

export default function routinePage() {
    const poses = [
        { id: 1, name: "Mountain Pose", image: "/test.png" },
        { id: 2, name: "Downward Dog", image: "/test.png" },
        { id: 3, name: "Warrior Pose", image: "/test.png" },
        { id: 4, name: "Tree Pose", image: "/test.png" },
        { id: 5, name: "Child's Pose", image: "/test.png" }
    ];



    return (
        <>
            <div className="flex flex-col min-h-screen items-center bg-gradient-to-t from-pink-100 to-white font-sans pt-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-700 mb-20">
                    Select your poses !
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {poses.map((pose) => (
                        <div key={pose.id} className="bg-pink-300 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white">
                                <Image
                                    src={pose.image}
                                    fill
                                    alt={pose.name}
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xl sm:text-2xl text-stone-600 font-medium text-center mt-6">
                                {pose.name}
                            </p>
                        </div>
                    ))}
                </div>

                <Link href="/scoring">
                    <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg fixed bottom-4 right-4">
                        Begin Workout
                    </button>
                </Link>
            </div>
        </>
    )
}