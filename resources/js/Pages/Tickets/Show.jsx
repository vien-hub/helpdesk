import { PriorityBadge, StatusBadge } from '@/Components/Badge';
import DeleteTicketButton from '@/Components/DeleteTicketButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const fmt = (iso) => new Date(iso).toLocaleString();

export default function Show({ ticket }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h1>}>
            <Head title={`Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-3xl">
                <Link href={route('tickets.index')} className="text-sm text-indigo-600 hover:underline">
                    &larr; Back to tickets
                </Link>

                <div className="mt-3 rounded-lg bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h2 className="break-words text-2xl font-bold text-gray-900">{ticket.title}</h2>
                        <div className="flex shrink-0 gap-2">
                            <PriorityBadge value={ticket.priority} />
                            <StatusBadge value={ticket.status} />
                        </div>
                    </div>

                    {/* Rendered as plain text: React escapes it, no dangerouslySetInnerHTML. */}
                    <p className="mt-4 whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                    <dl className="mt-6 grid gap-4 border-t border-gray-200 pt-4 text-sm sm:grid-cols-3">
                        <div>
                            <dt className="text-gray-500">Category</dt>
                            <dd className="font-medium text-gray-900">{ticket.category}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Created</dt>
                            <dd className="font-medium text-gray-900">{fmt(ticket.created_at)}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Last updated</dt>
                            <dd className="font-medium text-gray-900">{fmt(ticket.updated_at)}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('tickets.edit', ticket.id)}
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Edit
                        </Link>
                        <DeleteTicketButton
                            ticket={ticket}
                            className="inline-flex justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
