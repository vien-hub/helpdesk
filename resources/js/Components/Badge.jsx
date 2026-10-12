const priorityStyles = {
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-sky-100 text-sky-800",
    High: "bg-amber-100 text-amber-800",
    Urgent: "bg-rose-100 text-rose-800",
};
const statusStyles = {
    Open: "bg-amber-100 text-amber-800",
    "In Progress": "bg-sky-100 text-sky-800",
    Resolved: "bg-emerald-100 text-emerald-800",
    Closed: "bg-slate-200 text-slate-700",
};
const dot = {
    Open: "bg-amber-500",
    "In Progress": "bg-sky-500",
    Resolved: "bg-emerald-500",
    Closed: "bg-slate-500",
};
const base =
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold";

export function PriorityBadge({ value }) {
    return (
        <span
            className={`${base} ${priorityStyles[value] ?? priorityStyles.Low}`}
        >
            {value}
        </span>
    );
}

export function StatusBadge({ value }) {
    return (
        <span className={`${base} ${statusStyles[value] ?? statusStyles.Open}`}>
            <span
                className={`h-1.5 w-1.5 rounded-full ${dot[value] ?? dot.Open}`}
            />
            {value}
        </span>
    );
}
