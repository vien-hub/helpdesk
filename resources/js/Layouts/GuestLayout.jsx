import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
                <Link
                    href="/"
                    className="relative flex items-center gap-2.5 text-xl font-extrabold"
                >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-500 text-white">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 100 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 100-4V7a2 2 0 012-2z"
                            />
                        </svg>
                    </span>
                    HelpDesk
                </Link>
                <div className="relative max-w-md">
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Report a problem.
                        <br />
                        Track it until it's fixed.
                    </h2>
                    <p className="mt-4 text-slate-300">
                        Create tickets, set priority, and see the status of
                        every request in one place.
                    </p>
                </div>
                <p className="relative text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} HelpDesk
                </p>
            </aside>

            <main className="flex items-center justify-center bg-slate-50 px-6 py-12">
                <div className="w-full max-w-sm">
                    <Link
                        href="/"
                        className="mb-8 flex items-center gap-2 text-lg font-extrabold text-slate-900 lg:hidden"
                    >
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-600 text-white">
                            H
                        </span>
                        HelpDesk
                    </Link>
                    {children}
                </div>
            </main>
        </div>
    );
}
