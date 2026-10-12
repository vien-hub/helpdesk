import { PriorityBadge, StatusBadge } from "@/Components/Badge";
import DeleteTicketButton from "@/Components/DeleteTicketButton";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const fmt = (iso) => new Date(iso).toLocaleDateString();
const field =
    "block w-full rounded-xl border-slate-300 bg-white text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500";

export default function Index({ tickets, filters, options }) {
    const [values, setValues] = useState(filters);

    const apply = (next) => {
        const params = Object.fromEntries(
            Object.entries(next).filter(([, v]) => v !== "")
        );
        router.get(route("tickets.index"), params, {
            preserveState: true,
            replace: true,
        });
    };

    const change = (name, value) => {
        const next = { ...values, [name]: value };
        setValues(next);
        if (name !== "search") apply(next); // selects filter instantly; search on submit
    };

    const clear = () => {
        const empty = { search: "", status: "", priority: "", category: "" };
        setValues(empty);
        apply(empty);
    };

    const hasFilters = Object.values(values).some((v) => v !== "");

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        My tickets
                    </h1>
                    <Link
                        href={route("tickets.create")}
                        className="inline-flex rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                    >
                        New ticket
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
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
            >
                <input
                    type="search"
                    value={values.search}
                    onChange={(e) => change("search", e.target.value)}
                    placeholder="Search title..."
                    className={`${field} lg:col-span-2`}
                    aria-label="Search tickets by title"
                />
                <select
                    value={values.status}
                    onChange={(e) => change("status", e.target.value)}
                    className={field}
                    aria-label="Filter by status"
                >
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
                <select
                    value={values.priority}
                    onChange={(e) => change("priority", e.target.value)}
                    className={field}
                    aria-label="Filter by priority"
                >
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
                <select
                    value={values.category}
                    onChange={(e) => change("category", e.target.value)}
                    className={field}
                    aria-label="Filter by category"
                >
                    <option value="">All categories</option>
                    {options.categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
                <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
                    <button
                        type="submit"
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Search
                    </button>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clear}
                            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </form>

            {tickets.data.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
                    <p className="text-lg font-bold text-slate-900">
                        {hasFilters
                            ? "No tickets match your filters"
                            : "No tickets yet"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        {hasFilters
                            ? "Change or clear the filters to see more."
                            : "Create a ticket to report a problem."}
                    </p>
                    {!hasFilters && (
                        <Link
                            href={route("tickets.create")}
                            className="mt-5 inline-flex rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                        >
                            Create ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
                                <tr>
                                    <th className="px-5 py-3">Title</th>
                                    <th className="px-5 py-3">Category</th>
                                    <th className="px-5 py-3">Priority</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Created</th>
                                    <th className="px-5 py-3 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.data.map((t) => (
                                    <tr
                                        key={t.id}
                                        className="transition hover:bg-slate-50"
                                    >
                                        <td className="max-w-xs truncate px-5 py-4 font-semibold text-slate-900">
                                            <Link
                                                href={route(
                                                    "tickets.show",
                                                    t.id
                                                )}
                                                className="hover:text-teal-700"
                                            >
                                                {t.title}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {t.category}
                                        </td>
                                        <td className="px-5 py-4">
                                            <PriorityBadge value={t.priority} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge value={t.status} />
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {fmt(t.created_at)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-4 font-semibold">
                                                <Link
                                                    href={route(
                                                        "tickets.show",
                                                        t.id
                                                    )}
                                                    className="text-teal-700 hover:text-teal-800"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "tickets.edit",
                                                        t.id
                                                    )}
                                                    className="text-slate-600 hover:text-slate-900"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteTicketButton
                                                    ticket={t}
                                                    className="text-rose-600 hover:text-rose-700"
                                                />
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
                            <li
                                key={t.id}
                                className="rounded-2xl border border-slate-200 bg-white p-4"
                            >
                                <Link
                                    href={route("tickets.show", t.id)}
                                    className="block break-words font-bold text-slate-900"
                                >
                                    {t.title}
                                </Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                                <p className="mt-2 text-xs text-slate-500">
                                    {t.category} &middot; {fmt(t.created_at)}
                                </p>
                                <div className="mt-3 flex gap-5 border-t border-slate-100 pt-3 text-sm font-semibold">
                                    <Link
                                        href={route("tickets.show", t.id)}
                                        className="text-teal-700"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route("tickets.edit", t.id)}
                                        className="text-slate-600"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteTicketButton
                                        ticket={t}
                                        className="text-rose-600"
                                    />
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
