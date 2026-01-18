import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
export default function ScoringPage() {
    return (
        <>
            <Link href="/routines">
                <button className="px-8 py-4 bg-pink-400 text-white rounded-full font-semibold hover:bg-pink-500 transition-colors shadow-lg fixed top-4 left-4">
                    Back
                </button>
            </Link>
            <div className="flex flex-row min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 font-sans dark:bg-zinc-100">

                <div className="flex flex-row w-full max-w-7xl mx-auto bg-pink-300 p-8 rounded-lg shadow-lg mb-15 mt-20">
                    <div className="relative w-full h-[800px] rounded overflow-hidden bg-white">
                        <Image
                            src='/test.png'
                            fill
                            alt='test'
                            className='object-contain'
                        />
                    </div>
                </div>
                <div className="relative bg-white-500/10 p-7 rounded-3xl hover:shadow-pink-200 transition-shadow duration-500">
                    <Image
                        src='/neutral.png'
                        width={300}
                        height={300}
                        alt='test'
                        className="relative z-10"
                    />
                </div>
            </div>
        </>
    )
}