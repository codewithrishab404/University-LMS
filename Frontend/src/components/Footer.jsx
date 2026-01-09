import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Glow divider */}
      <div className="footer-divider" />

      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section brand">
          <h3>University CMS</h3>
          <p>
            A modern platform to manage courses, students, instructors, grades,
            and projects.
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Student Portal</li>
            <li>Instructor Portal</li>
            <li>About</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 support@universitycms.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} University CMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
