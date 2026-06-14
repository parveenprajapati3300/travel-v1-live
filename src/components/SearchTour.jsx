import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function SearchTour() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submitSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/destinations?search=${encodeURIComponent(value)}` : '/destinations')
  }

  return (
    <Form className="hero-destination-search" onSubmit={submitSearch} data-aos="fade-up">
      <FaMagnifyingGlass />
      <Form.Control
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter Your Dream Destination!"
        aria-label="Search destination or package"
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchTour
