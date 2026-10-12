import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function DeleteTicketButton({ ticket, className = '', children = 'Delete' }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && !processing && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, processing]);

    const confirmDelete = () => {
        router.delete(route('tickets.destroy', ticket.id), {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={className}>
                {children}
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                >
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h2 id="delete-title" className="text-lg font-semibold text-gray-900">
                            Delete this ticket?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            "{ticket.title}" will be permanently deleted. This cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={processing}
                                onClick={() => setOpen(false)}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={processing}
                                onClick={confirmDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Deleting...' : 'Yes, delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
