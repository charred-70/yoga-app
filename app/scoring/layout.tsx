import React from 'react';

export default function scoringLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>

            {children}
        </section>
    );
}