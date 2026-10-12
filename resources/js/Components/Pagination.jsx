import { Link } from '@inertiajs/react';

export default function Pagination({ paginator }) {
    if (!paginator || paginator.last_page <= 1) return null;

    // First and last entries are "Previous"/"Next"; the rest are page numbers.
    const pages = paginator.links.slice(1, -1);
    const item = 'rounded-md border px-3 py-1.5 text-sm';

    return (
        <nav className="flex flex-col items-center justify-between gap-3 sm:flex-row" aria-label="Pagination">
            <p className="text-sm text-gray-600">
                Showing {paginator.from} to {paginator.to} of {paginator.total} tickets
            </p>
            <div className="flex flex-wrap items-center gap-1">
                {paginator.prev_page_url ? (
                    <Link href={paginator.prev_page_url} preserveScroll className={`${item} bg-white hover:bg-gray-50`}>
                        Previous
                    </Link>
                ) : (
                    <span className={`${item} cursor-not-allowed bg-gray-100 text-gray-400`}>Previous</span>
                )}

                {pages.map((link, i) =>
                    link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={`${item} ${
                                link.active
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'bg-white hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span key={i} className="px-2 text-sm text-gray-500">
                            {link.label}
                        </span>
                    )
                )}

                {paginator.next_page_url ? (
                    <Link href={paginator.next_page_url} preserveScroll className={`${item} bg-white hover:bg-gray-50`}>
                        Next
                    </Link>
                ) : (
                    <span className={`${item} cursor-not-allowed bg-gray-100 text-gray-400`}>Next</span>
                )}
            </div>
        </nav>
    );
}
