import { NavLink } from 'react-router-dom'
import { FaBell, FaCompass, FaHouse, FaSuitcaseRolling, FaUsers } from 'react-icons/fa6'

const items = [
  { to: '/', label: 'Home', icon: <FaHouse /> },
  { to: '/destinations', label: 'Trips', icon: <FaSuitcaseRolling /> },
  { to: '/community', label: 'Community', icon: <FaUsers /> },
  { to: '/blogs', label: 'Blogs', icon: <FaCompass /> },
  { to: '/login', label: 'Profile', icon: <FaBell /> },
]

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map((item) => (
        <NavLink key={item.label} to={item.to}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
