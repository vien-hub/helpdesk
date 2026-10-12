import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TicketForm from './Partials/TicketForm';

export default function Create({ options }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-800">New Ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-3xl">
                <TicketForm options={options} submitLabel="Create Ticket" />
            </div>
        </AuthenticatedLayout>
    );
}
