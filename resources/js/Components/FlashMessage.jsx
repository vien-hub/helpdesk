import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    const message = flash?.success || flash?.error;
    const isError = !flash?.success && !!flash?.error;

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000); // auto-dismiss
        return () => clearTimeout(timer);
    }, [flash]);

    if (!message || !visible) return null;

    return (
        <div className="fixed inset-x-0 top-20 z-50 mx-auto w-full max-w-md px-4" role="status" aria-live="polite">
            <div
                className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 shadow-lg ${
                    isError
                        ? 'border-red-200 bg-red-50 text-red-800'
                        : 'border-green-200 bg-green-50 text-green-800'
                }`}
            >
                <p className="text-sm font-medium">{message}</p>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="text-lg leading-none opacity-60 hover:opacity-100"
                    aria-label="Dismiss message"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
