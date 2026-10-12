import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import DeleteTicketButton from '@/Components/DeleteTicketButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const fmt = (iso) => new Date(iso).toLocaleDateString();
const field =
    'block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function Index({ tickets, filters, options }) {
    const [values, setValues] = useState(filters);

    const apply = (next) => {
        const params = Object.fromEntries(Object.entries(next).filter(([, v]) => v !== ''));
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    };

    const change = (name, value) => {
        const next = { ...values, [name]: value };
        setValues(next);
        if (name !== 'search') apply(next); // selects filter instantly; search on submit
    };

    const clear = () => {
        const empty = { search: '', status: '', priority: '', category: '' };
        setValues(empty);
        apply(empty);
    };

    const hasFilters = Object.values(values).some((v) => v !== '');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">My Tickets</h1>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    apply(values);
                }}
                className="grid gap-3 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
            >
                <input
                    type="search"
                    value={values.search}
                    onChange={(e) => change('search', e.target.value)}
                    placeholder="Search title..."
                    className={`${field} lg:col-span-2`}
                    aria-label="Search tickets by title"
                />
                <select value={values.status} onChange={(e) => change('status', e.target.value)} className={field} aria-label="Filter by status">
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
                <select value={values.priority} onChange={(e) => change('priority', e.target.value)} className={field} aria-label="Filter by priority">
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
                <select value={values.category} onChange={(e) => change('category', e.target.value)} className={field} aria-label="Filter by category">
                    <option value="">All categories</option>
                    {options.categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
                <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
                    <button type="submit" className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">
                        Search
                    </button>
                    {hasFilters && (
                        <button type="button" onClick={clear} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Clear filters
                        </button>
                    )}
                </div>
            </form>

            {tickets.data.length === 0 ? (
                <div className="mt-6 rounded-lg bg-white px-4 py-12 text-center shadow-sm">
                    <p className="text-lg font-semibold text-gray-800">
                        {hasFilters ? 'No tickets match your filters' : 'No tickets yet'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasFilters
                            ? 'Try changing or clearing the filters.'
                            : 'Everything is running smoothly, or you have not reported anything yet.'}
                    </p>
                    {!hasFilters && (
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Create your first ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="mt-6 hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="max-w-xs truncate px-4 py-3 font-medium text-gray-900">
                                            <Link href={route('tickets.show', t.id)} className="hover:text-indigo-600">
                                                {t.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                        <td className="px-4 py-3 text-gray-600">{fmt(t.created_at)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-3">
                                                <Link href={route('tickets.show', t.id)} className="text-indigo-600 hover:underline">View</Link>
                                                <Link href={route('tickets.edit', t.id)} className="text-gray-700 hover:underline">Edit</Link>
                                                <DeleteTicketButton ticket={t} className="text-red-600 hover:underline" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile stacked cards */}
                    <ul className="mt-6 space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <li key={t.id} className="rounded-lg bg-white p-4 shadow-sm">
                                <Link href={route('tickets.show', t.id)} className="block break-words font-semibold text-gray-900">
                                    {t.title}
                                </Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {t.category} &middot; {fmt(t.created_at)}
                                </p>
                                <div className="mt-3 flex gap-4 border-t border-gray-100 pt-3 text-sm">
                                    <Link href={route('tickets.show', t.id)} className="text-indigo-600">View</Link>
                                    <Link href={route('tickets.edit', t.id)} className="text-gray-700">Edit</Link>
                                    <DeleteTicketButton ticket={t} className="text-red-600" />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <Pagination paginator={tickets} />
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
