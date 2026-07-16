'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(pageNumber: number | string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 rounded border ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
                aria-disabled={currentPage <= 1}
            >
                Previous
            </Link>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 rounded border ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }`}
                aria-disabled={currentPage >= totalPages}
            >
                Next
            </Link>
        </div>
    );
}