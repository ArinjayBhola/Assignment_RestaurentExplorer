interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, pages, total, onChange }: PaginationProps) => {
  const canPrev = page > 1;
  const canNext = page < pages;

  const handleChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pages || nextPage === page) return;
    onChange(nextPage);
  };

  const renderPageButtons = () => {
    const buttons: number[] = [];
    const maxButtons = 5;
    let start = Math.max(page - 2, 1);
    let end = Math.min(start + maxButtons - 1, pages);
    if (end - start < maxButtons - 1) {
      start = Math.max(end - maxButtons + 1, 1);
    }
    for (let i = start; i <= end; i += 1) {
      buttons.push(i);
    }
    return buttons;
  };

  if (pages <= 1) return null;

  return (
    <nav className="flex flex-col items-center gap-3" aria-label="Pagination">
      <p className="text-sm text-gray-600">
        Showing page {page} of {pages} ({total} restaurants)
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleChange(page - 1)}
          disabled={!canPrev}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        {renderPageButtons().map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => handleChange(pageNumber)}
            aria-current={pageNumber === page ? 'page' : undefined}
            className={`h-10 w-10 rounded-full text-sm font-semibold ${
              pageNumber === page
                ? 'bg-brand-primary text-white'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleChange(page + 1)}
          disabled={!canNext}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;

