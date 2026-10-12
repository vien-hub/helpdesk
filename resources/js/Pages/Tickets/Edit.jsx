import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TicketForm from "./Partials/TicketForm";

export default function Edit({ ticket, options }) {
    return (
        <AuthenticatedLayout
            header={
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Edit Ticket #{ticket.id}
                </h1>
            }
        >
            <Head title={`Edit Ticket #${ticket.id}`} />
            <div className="mx-auto max-w-3xl">
                <TicketForm
                    ticket={ticket}
                    options={options}
                    submitLabel="Save Changes"
                />
            </div>
        </AuthenticatedLayout>
    );
}
