import FlashMessage from '@/Components/FlashMessage';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const navLink = (active) =>
        `rounded-md px-3 py-2 text-sm font-medium ${
            active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
        }`;

    const newTicketBtn =
        'inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500';

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard')} className="text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 md:flex">
                            <Link href={route('dashboard')} className={navLink(route().current('dashboard'))}>
                                Dashboard
                            </Link>
                            <Link href={route('tickets.index')} className={navLink(route().current('tickets.index'))}>
                                Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link href={route('tickets.create')} className={newTicketBtn}>
                            + New Ticket
                        </Link>
                        <Link href={route('profile.edit')} className="text-sm text-gray-700 hover:underline">
                            {auth.user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 md:hidden">
                        <Link href={route('dashboard')} className={`block ${navLink(route().current('dashboard'))}`}>
                            Dashboard
                        </Link>
                        <Link href={route('tickets.index')} className={`block ${navLink(route().current('tickets.index'))}`}>
                            Tickets
                        </Link>
                        <Link href={route('tickets.create')} className={`${newTicketBtn} w-full justify-center`}>
                            + New Ticket
                        </Link>
                        <div className="border-t border-gray-200 pt-3">
                            <Link href={route('profile.edit')} className="block px-3 py-2 text-sm text-gray-700">
                                {auth.user.name}
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <FlashMessage />

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
