import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6'
import { getSearchSuggestions } from '../services/api'

const typeLabels = {
  package: 'Package',
  destination: 'Destination',
  theme: 'Theme',
}

function SearchTour({ placeholder = 'Search by theme, package and destination' }) {
  const navigate = useNavigate()
  const searchInputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()

  const exactMatch = useMemo(
    () => suggestions.find((item) => item.label.toLowerCase() === normalizedQuery),
    [normalizedQuery, suggestions],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions(query.trim())
        .then((response) => setSuggestions(response.data || []))
        .catch(() => setSuggestions([]))
    }, 180)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = setTimeout(() => searchInputRef.current?.focus(), 50)
    document.body.classList.add('search-overlay-open')

    return () => {
      clearTimeout(timer)
      document.body.classList.remove('search-overlay-open')
    }
  }, [isOpen])

  const openSearchPanel = (event) => {
    event?.preventDefault()
    setIsOpen(true)
  }

  const closeSearchPanel = () => {
    setIsOpen(false)
  }

  const openResult = (item) => {
    if (!item?.url) return
    setIsOpen(false)
    setQuery(item.label)
    navigate(item.url)
  }

  const selectResult = (event, item) => {
    event.preventDefault()
    event.stopPropagation()
    openResult(item)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    const selectedItem = exactMatch || suggestions[0]

    if (selectedItem) {
      openResult(selectedItem)
      return
    }

    setIsOpen(false)
    navigate(value ? `/destinations?search=${encodeURIComponent(value)}` : '/destinations')
  }

  return (
    <>
      <Form className="hero-destination-search" onSubmit={openSearchPanel} data-aos="fade-up">
        <FaMagnifyingGlass />
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={openSearchPanel}
          onClick={openSearchPanel}
          placeholder={placeholder}
          aria-label="Search destination or package"
          autoComplete="off"
        />
        <Button type="submit">Search</Button>
      </Form>

      {isOpen && (
        <div className="search-fullscreen-overlay" role="dialog" aria-modal="true" aria-label="Search packages, destinations and themes">
          <div className="search-fullscreen-panel">
            <div className="search-fullscreen-header">
              <span>Search Trips</span>
              <button type="button" onClick={closeSearchPanel} aria-label="Close search">
                <FaXmark />
              </button>
            </div>

            <Form className="hero-destination-search search-overlay-form" onSubmit={submitSearch}>
              <FaMagnifyingGlass />
              <Form.Control
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Search by theme, package and destination"
                autoComplete="off"
              />
              <Button type="submit">Search</Button>
            </Form>

            <div className="search-suggestion-list search-overlay-results">
              {suggestions.length > 0 ? suggestions.map((item) => (
                <button
                  type="button"
                  key={`${item.type}-${item.id}`}
                  className="search-suggestion-item"
                  onMouseDown={(event) => selectResult(event, item)}
                  onClick={(event) => selectResult(event, item)}
                >
                  {item.image && <img src={item.image} alt={item.label} />}
                  <span>
                    <strong>{item.label}</strong>
                    <small>{typeLabels[item.type] || item.type}{item.meta ? ` - ${item.meta}` : ''}</small>
                  </span>
                </button>
              )) : (
                <div className="search-empty-state">No result found. Type another theme, package or destination.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchTour
