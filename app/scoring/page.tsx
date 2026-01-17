import Link from 'next/link';
import React from 'react';
export default function scoringPage() {
    return (
        <div>hi
            <img></img>
            <Link href="/routines">
                <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg">
                    Get Started
                </button>
            </Link>
        </div>
    )
}