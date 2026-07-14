import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
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
  const reopenBlockedUntilRef = useRef(0)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()

  const exactMatch = useMemo(
    () => suggestions.find((item) => item.label.toLowerCase() === normalizedQuery),
    [normalizedQuery, suggestions],
  )

  useEffect(() => {
    const value = query.trim()
    const timer = setTimeout(() => {
      getSearchSuggestions(value)
        .then((response) => setSuggestions(response.data || []))
        .catch(() => setSuggestions([]))
    }, 180)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!isOpen) return undefined
    const timer = setTimeout(() => searchInputRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    if (query.trim().length >= 2) return undefined

    const timer = setTimeout(() => {
      getSearchSuggestions('')
        .then((response) => setSuggestions(response.data || []))
        .catch(() => setSuggestions([]))
    }, 120)

    return () => clearTimeout(timer)
  }, [isOpen, query])

  const openSearchPanel = (event) => {
    event?.preventDefault()
    if (Date.now() < reopenBlockedUntilRef.current) return
    if (isOpen) return
    setIsOpen(true)
    if (suggestions.length === 0) {
      getSearchSuggestions('')
        .then((response) => setSuggestions(response.data || []))
        .catch(() => setSuggestions([]))
    }
  }

  const closeSearchPanel = () => {
    reopenBlockedUntilRef.current = Date.now() + 300
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
        <Button type="submit" className="hero-search-ghost-btn">Explore</Button>
      </Form>

      <Modal
        show={isOpen}
        onHide={closeSearchPanel}
        centered
        backdrop
        keyboard
        restoreFocus={false}
        dialogClassName="search-fullscreen-dialog"
        contentClassName="search-fullscreen-panel"
        aria-labelledby="search-trips-title"
      >
        <div className="search-fullscreen-header">
          <span id="search-trips-title">Search Trips</span>
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
          <Button type="submit">Explore</Button>
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
      </Modal>
    </>
  )
}

export default SearchTour
