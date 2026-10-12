import { Link, useForm } from "@inertiajs/react";

const inputClass =
    "mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500";

function Field({ label, name, error, children }) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>
            {children}
            {error && (
                <p className="mt-1 text-sm text-rose-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function TicketForm({ ticket = null, options, submitLabel }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        priority: ticket?.priority ?? "Medium",
        status: ticket?.status ?? "Open",
        category: ticket?.category ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (ticket) {
            put(route("tickets.update", ticket.id));
        } else {
            post(route("tickets.store"));
        }
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form
            onSubmit={submit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
            noValidate
        >
            {hasErrors && (
                <div
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                    role="alert"
                >
                    Please fix the errors below and try again.
                </div>
            )}

            <Field label="Title" name="title" error={errors.title}>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className={inputClass}
                    maxLength={255}
                    placeholder="Short summary of the problem"
                />
            </Field>

            <Field
                label="Description"
                name="description"
                error={errors.description}
            >
                <textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={inputClass}
                    placeholder="Describe the issue in detail (at least 10 characters)"
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Priority" name="priority" error={errors.priority}>
                    <select
                        id="priority"
                        value={data.priority}
                        onChange={(e) => setData("priority", e.target.value)}
                        className={inputClass}
                    >
                        {options.priorities.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Status" name="status" error={errors.status}>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className={inputClass}
                    >
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Category" name="category" error={errors.category}>
                    <select
                        id="category"
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select a category</option>
                        {options.categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                    href={
                        ticket
                            ? route("tickets.show", ticket.id)
                            : route("tickets.index")
                    }
                    className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
