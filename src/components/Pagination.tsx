import { useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) => {
  const items = [10, 25, 50];

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(totalPages);
    }
  }, [totalPages, currentPage, onPageChange]);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', flexWrap: 'wrap' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: '8px 16px',
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage <= 1 ? 0.5 : 1,
        }}
      >
        Предыдущая
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '8px 12px',
            border: page === currentPage ? '1px solid #0055FF' : '1px solid #DFE3E8',
            background: page === currentPage ? '#0055FF' : 'white',
            color: page === currentPage ? 'white' : '#495057',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          padding: '8px 16px',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        Следующая
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px' }}>На странице:</span>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onPerPageChange(item)}
            style={{
              padding: '4px 12px',
              border: perPage === item ? '1px solid #0055FF' : '1px solid #DFE3E8',
              background: perPage === item ? '#0055FF' : 'white',
              color: perPage === item ? 'white' : '#495057',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};