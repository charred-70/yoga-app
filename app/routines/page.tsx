import Link from 'next/link';
import React from 'react';
export default function routinePage() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center bg-sky-50 font-sans dark:bg-zinc-100">
                <div className="text-sky-500">wtf now</div>
                <Link href="/scoring">
                    <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg">
                        Get Started
                    </button>
                </Link>
            </div>
        </>
    )
}