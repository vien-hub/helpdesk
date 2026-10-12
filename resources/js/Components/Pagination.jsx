import { Link } from "@inertiajs/react";

export default function Pagination({ paginator }) {
    if (!paginator || paginator.last_page <= 1) return null;

    const pages = paginator.links.slice(1, -1);
    const item = "rounded-xl border px-3 py-1.5 text-sm font-medium";

    return (
        <nav
            className="flex flex-col items-center justify-between gap-3 sm:flex-row"
            aria-label="Pagination"
        >
            <p className="text-sm text-slate-600">
                Showing {paginator.from} to {paginator.to} of {paginator.total}{" "}
                tickets
            </p>
            <div className="flex flex-wrap items-center gap-1">
                {paginator.prev_page_url ? (
                    <Link
                        href={paginator.prev_page_url}
                        preserveScroll
                        className={`${item} border-slate-300 bg-white hover:bg-slate-50`}
                    >
                        Previous
                    </Link>
                ) : (
                    <span
                        className={`${item} cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400`}
                    >
                        Previous
                    </span>
                )}

                {pages.map((link, i) =>
                    link.url ? (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={`${item} ${
                                link.active
                                    ? "border-teal-600 bg-teal-600 text-white"
                                    : "border-slate-300 bg-white hover:bg-slate-50"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span key={i} className="px-2 text-sm text-slate-500">
                            {link.label}
                        </span>
                    )
                )}

                {paginator.next_page_url ? (
                    <Link
                        href={paginator.next_page_url}
                        preserveScroll
                        className={`${item} border-slate-300 bg-white hover:bg-slate-50`}
                    >
                        Next
                    </Link>
                ) : (
                    <span
                        className={`${item} cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400`}
                    >
                        Next
                    </span>
                )}
            </div>
        </nav>
    );
}
