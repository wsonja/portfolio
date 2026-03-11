export default function Footer() {
    return (
      <footer className="footer mt-5">
        <div className="footer-links mb-2">
          <a href="https://linkedin.com/in/sonja-wong" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:sonja.hinting@gmail.com">Email</a>
        </div>
        <div>
          © {new Date().getFullYear()} Sonja Wong. All rights reserved.
        </div>
      </footer>
    );
  }