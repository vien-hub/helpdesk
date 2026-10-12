import FlashMessage from "@/Components/FlashMessage";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const icons = {
    home: "M3 12l9-9 9 9M5 10v10h14V10",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    plus: "M12 5v14M5 12h14",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0",
    logout: "M15 17l5-5-5-5M20 12H9M12 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7",
};

const Icon = ({ name }) => (
    <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
);

export default function AuthenticatedLayout({ header, children }) {
    const page = usePage();
    const { auth } = page.props;
    const url = page.url;
    const [open, setOpen] = useState(false);

    // close the drawer after navigating
    useEffect(() => {
        setOpen(false);
    }, [url]);

    const item = (active) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
            active
                ? "bg-teal-500/15 text-teal-300"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`;

    const nav = (
        <div className="flex h-full flex-col">
            <Link
                href={route("dashboard")}
                className="flex items-center gap-2.5 px-3 py-2 text-lg font-extrabold text-white"
            >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-500">
                    H
                </span>
                HelpDesk
            </Link>

            <Link
                href={route("tickets.create")}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                <Icon name="plus" /> New ticket
            </Link>

            <nav className="mt-6 space-y-1" aria-label="Main">
                <Link
                    href={route("dashboard")}
                    className={item(route().current("dashboard"))}
                >
                    <Icon name="home" /> Dashboard
                </Link>
                <Link
                    href={route("tickets.index")}
                    className={item(
                        route().current("tickets.*") &&
                            !route().current("tickets.create")
                    )}
                >
                    <Icon name="list" /> Tickets
                </Link>
                <Link
                    href={route("profile.edit")}
                    className={item(route().current("profile.*"))}
                >
                    <Icon name="user" /> Profile
                </Link>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 px-3 pb-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-700 text-sm font-bold text-white">
                        {auth.user.name?.[0]?.toUpperCase()}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                            {auth.user.name}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                            {auth.user.email}
                        </p>
                    </div>
                </div>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className={`w-full ${item(false)}`}
                >
                    <Icon name="logout" /> Log out
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-slate-900 p-4 lg:block">
                {nav}
            </aside>

            <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
                <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2 font-extrabold text-slate-900"
                >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-600 text-white">
                        H
                    </span>
                    HelpDesk
                </Link>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    aria-label="Open menu"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="absolute inset-0 bg-slate-900/50"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="absolute inset-y-0 left-0 w-72 bg-slate-900 p-4 shadow-xl">
                        {nav}
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <FlashMessage />

                {header && (
                    <header className="border-b border-slate-200 bg-white">
                        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
