import { PriorityBadge, StatusBadge } from "@/Components/Badge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ stats, recent }) {
    const cards = [
        { label: "Total tickets", value: stats.total, bar: "bg-slate-400" },
        { label: "Open", value: stats.open, bar: "bg-amber-500" },
        { label: "In progress", value: stats.in_progress, bar: "bg-sky-500" },
        {
            label: "Resolved / Closed",
            value: stats.resolved,
            bar: "bg-emerald-500",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Dashboard
                    </h1>
                    <Link
                        href={route("tickets.create")}
                        className="hidden rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 sm:inline-flex"
                    >
                        New ticket
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map((c) => (
                    <div
                        key={c.label}
                        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5"
                    >
                        <span
                            className={`absolute inset-y-0 left-0 w-1 ${c.bar}`}
                        />
                        <p className="text-sm font-medium text-slate-500">
                            {c.label}
                        </p>
                        <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                            {c.value}
                        </p>
                    </div>
                ))}
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="font-bold text-slate-900">Recent tickets</h2>
                    <Link
                        href={route("tickets.index")}
                        className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                        View all
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <div className="px-5 py-14 text-center">
                        <p className="font-semibold text-slate-900">
                            No tickets yet
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Create a ticket to report a problem.
                        </p>
                        <Link
                            href={route("tickets.create")}
                            className="mt-4 inline-flex rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                        >
                            Create ticket
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {recent.map((t) => (
                            <li key={t.id}>
                                <Link
                                    href={route("tickets.show", t.id)}
                                    className="flex flex-col gap-2 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="font-semibold text-slate-900">
                                        {t.title}
                                    </span>
                                    <span className="flex gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
