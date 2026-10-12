import { PriorityBadge, StatusBadge } from "@/Components/Badge";
import DeleteTicketButton from "@/Components/DeleteTicketButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const fmt = (iso) => new Date(iso).toLocaleString();

export default function Show({ ticket }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Ticket #{ticket.id}
                </h1>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-3xl">
                <Link
                    href={route("tickets.index")}
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                >
                    &larr; Back to tickets
                </Link>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h2 className="break-words text-2xl font-extrabold tracking-tight text-slate-900">
                            {ticket.title}
                        </h2>
                        <div className="flex shrink-0 gap-2">
                            <PriorityBadge value={ticket.priority} />
                            <StatusBadge value={ticket.status} />
                        </div>
                    </div>

                    {/* Plain text: React escapes it, no dangerouslySetInnerHTML. */}
                    <p className="mt-5 whitespace-pre-wrap break-words leading-relaxed text-slate-700">
                        {ticket.description}
                    </p>

                    <dl className="mt-8 grid gap-4 border-t border-slate-100 pt-5 text-sm sm:grid-cols-3">
                        <div>
                            <dt className="text-slate-500">Category</dt>
                            <dd className="mt-0.5 font-semibold text-slate-900">
                                {ticket.category}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Created</dt>
                            <dd className="mt-0.5 font-semibold text-slate-900">
                                {fmt(ticket.created_at)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Last updated</dt>
                            <dd className="mt-0.5 font-semibold text-slate-900">
                                {fmt(ticket.updated_at)}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route("tickets.edit", ticket.id)}
                            className="inline-flex justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                        >
                            Edit ticket
                        </Link>
                        <DeleteTicketButton
                            ticket={ticket}
                            className="inline-flex justify-center rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
