interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={isFavorite}
    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
      isFavorite
        ? 'border-brand-primary bg-brand-primary text-white'
        : 'border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:text-brand-primary'
    }`}
  >
    <svg
      className={`h-4 w-4 ${isFavorite ? 'fill-current' : 'stroke-current'}`}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill={isFavorite ? 'currentColor' : 'none'}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.995 21.35s-8.495-5.06-8.495-11.2a4.995 4.995 0 0 1 9.183-2.773A4.995 4.995 0 0 1 20.86 10.15c0 6.14-8.865 11.2-8.865 11.2Z"
      />
    </svg>
    {isFavorite ? 'Favorited' : 'Add to favorites'}
  </button>
);

export default FavoriteButton;

