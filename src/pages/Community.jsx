import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaCommentDots, FaPeopleGroup, FaUser } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'

const groups = ['Solo Travel', 'Trekking', 'International Trips', 'Weekend Trips']
const members = [
  { name: 'Riya Sharma', interest: 'Solo backpacking and cafe trails', image: new URL('../assets/travel/community/community-1494790108377-w500-80.jpg', import.meta.url).href },
  { name: 'Aman Verma', interest: 'Bike trips, mountains, and group tours', image: new URL('../assets/travel/community/community-1500648767791-w500-80.jpg', import.meta.url).href },
  { name: 'Neha Kapoor', interest: 'International city breaks and food walks', image: new URL('../assets/travel/community/community-1534528741775-w500-80.jpg', import.meta.url).href },
]

function Community() {
  return (
    <section className="page-section community-section">
      <Container>
        <SectionHeading eyebrow="Community" title="Traveler Profiles, Groups, And Forums" text="Dummy community page with member profiles, travel groups, meetups, and discussion categories." />
        <Row className="g-4 mb-5">
          {members.map((member) => (
            <Col md={4} key={member.name}>
              <article className="community-card glass-card" data-aos="fade-up">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.interest}</p>
                <Button as={Link} to="/login" variant="outline-dark" size="sm"><FaUser /> View Profile</Button>
              </article>
            </Col>
          ))}
        </Row>
        <Row className="g-4">
          <Col lg={6}>
            <div className="detail-block">
              <h2><FaPeopleGroup /> Travel Groups</h2>
              <div className="forum-tags">
                {groups.map((group) => <Badge bg="light" text="dark" key={group}>{group}</Badge>)}
              </div>
              <Button as={Link} to="/login" className="btn-gradient mt-3">Create Or Join Group</Button>
            </div>
          </Col>
          <Col lg={6}>
            <div className="detail-block">
              <h2><FaCommentDots /> Discussion Forums</h2>
              <p>Ask questions, share plans, compare routes, and discover travelers with similar interests.</p>
              <Button as={Link} to="/login" variant="outline-dark">Start Discussion</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Community
