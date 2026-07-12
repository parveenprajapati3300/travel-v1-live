import { Button } from 'react-bootstrap'

const PAGE_SIZE = 10

function AdminPagination({ currentPage, onPageChange, totalItems, pageSize = PAGE_SIZE }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0
  const endItem = Math.min(currentPage * pageSize, totalItems)

  if (totalItems <= pageSize) return null

  return (
    <div className="admin-pagination">
      <span>Showing {startItem}-{endItem} of {totalItems}</span>
      <div>
        <Button
          size="sm"
          variant="outline-dark"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <strong>{currentPage} / {totalPages}</strong>
        <Button
          size="sm"
          variant="outline-dark"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export { PAGE_SIZE }
export default AdminPagination
