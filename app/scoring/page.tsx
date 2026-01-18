import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
export default function scoringPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-sky-50 font-sans dark:bg-zinc-100">

            <div className="w-full max-w-7xl mx-auto bg-pink-300 p-8 rounded-lg shadow-lg mb-15">
                <div className="relative w-full h-[800px] rounded overflow-hidden bg-white">
                    <Image
                        src='/test.png'
                        fill
                        alt='test'
                        className='object-contain'
                    />
                </div>
            </div>


            <Link href="/routines">
                <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg fixed top-4 left-4">
                    Back
                </button>
            </Link>
        </div>
    )
}