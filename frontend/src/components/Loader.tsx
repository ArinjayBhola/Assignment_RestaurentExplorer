const Loader = ({ label = 'Loading' }: { label?: string }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center justify-center gap-3 py-10 text-gray-600"
  >
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
    <p className="text-sm font-medium">{label}…</p>
  </div>
);

export default Loader;

