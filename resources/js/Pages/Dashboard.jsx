import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recent }) {
    const cards = [
        { label: 'Total tickets', value: stats.total, color: 'text-gray-900' },
        { label: 'Open', value: stats.open, color: 'text-yellow-700' },
        { label: 'In progress', value: stats.in_progress, color: 'text-indigo-700' },
        { label: 'Resolved / Closed', value: stats.resolved, color: 'text-green-700' },
    ];

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map((c) => (
                    <div key={c.label} className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">{c.label}</p>
                        <p className={`mt-1 text-3xl font-bold ${c.color}`}>{c.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-lg bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <h2 className="font-semibold text-gray-800">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm text-indigo-600 hover:underline">
                        View all
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-gray-500">
                        You have no tickets yet.{' '}
                        <Link href={route('tickets.create')} className="text-indigo-600 hover:underline">
                            Create your first ticket
                        </Link>
                        .
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {recent.map((t) => (
                            <li key={t.id}>
                                <Link
                                    href={route('tickets.show', t.id)}
                                    className="flex flex-col gap-2 px-4 py-3 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="font-medium text-gray-900">{t.title}</span>
                                    <span className="flex gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
