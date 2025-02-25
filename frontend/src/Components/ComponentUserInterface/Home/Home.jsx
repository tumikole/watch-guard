import React, { useEffect } from 'react';
import './Home.css'; // Create a custom stylesheet for styling
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from '../Navbar/Navbar';

const Home = ({ getUserDetails, loggedInUser,loggedInUserToken, setLoggedInUserToken, loggedInUserType }) => {

  useEffect(() => {
    if (loggedInUser === null) {
      getUserDetails()
    }
  }, [loggedInUser, getUserDetails])

  return (
    <div className="homepage">
      <Navbar loggedInUserToken={loggedInUserToken} setLoggedInUserToken={setLoggedInUserToken} loggedInUser={loggedInUser} loggedInUserType={loggedInUserType}/>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Protecting Your Community Together</h1>
          <p>Real-time monitoring and quick emergency response at your fingertips.</p>
          {/* <button className="cta-button">Get Started</button> */}
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-Time Alerts</h3>
            <p>Get instant notifications about emergency situations.</p>
          </div>
          <div className="feature-card">
            <h3>Nearby Guards</h3>
            <p>Locate and communicate with nearby guards for quick assistance.</p>
          </div>
          <div className="feature-card">
            <h3>Safety Tips</h3>
            <p>Access community-driven safety tips and resources.</p>
          </div>
          <div className="feature-card">
            <h3>Community Alerts</h3>
            <p>Stay informed with local news and safety updates from your community.</p>
          </div>
          <div className="feature-card">
            <h3>Neighborhood Watch</h3>
            <p>Join the local watch program to report suspicious activities and stay alert.</p>
          </div>
        </div>
      </section>

      <section className="our-mission-and-values">
        <h1>Our Mission & Values</h1>
        <p>WatchGuard is dedicated to enhancing community safety through real-time information sharing and collaborative vigilance. Our mission is to keep residents informed about potential threats, ensuring a safer living environment for everyone. We believe in Community Engagement, Transparency, Safety First, and Collaboration. Our team, led by Tumisang Ramollo, Founder, and Gumani Netshiongolwe, our Community Outreach Coordinator, is committed to fostering a strong sense of security and awareness within the community. Join us in our mission to create safer neighborhoods for all.</p>
      </section>

      <section className='how-watchGuard'>
        <div className='how-watchGuard-keeps'>
          <h1>Discover How WatchGuard Keeps You Safe</h1>
          <p>WatchGuard offers a comprehensive platform designed to enhance community safety through real-time notifications and efficient incident reporting. Stay informed about potential threats in your area and take proactive steps to ensure your safety. Our platform connects residents, fostering a vigilant and secure neighborhood environment.</p>
        </div>

        <div className='how-watchGuard-keeps-content'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Community Says</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"The app has been a lifesaver for us—always know what's happening in our neighborhood!"</p>
            <h4>John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"Quick response times and easy communication with local guards. Very reassuring!"</p>
            <h4>Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Join Us and Make Your Community Safer</h2>
        <button className="cta-button">Sign Up Now</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>Contact us: communityguard@example.com</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
