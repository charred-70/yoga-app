import Link from 'next/link';
import React from 'react';

export default function routinePage() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-t from-pink-100 to-white font-sans">
                <Link href="/scoring">
                    <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg fixed bottom-4 right-4">
                        Begin Workout
                    </button>
                </Link>
            </div>
        </>
    )
}