import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer} className="bg-gradient-to-t from-blue-700 via-blue-800 to-gray-900 backdrop-blur-md opacity-45 text-black dark:text-white">
      <div style={styles.container}>
        
        {/* About */}
        <div>
          <h3>About School</h3>
          <p>
            Bright Future Public School provides quality education with modern
            teaching methods. We focus on academics, discipline, and overall
            development of students.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact</h3>
         
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@brightfuture.edu.in</p>
        </div>

        {/* Links */}
        <div>
          <h3>Quick Links</h3>
          <ul style={styles.list}>
            <li>Home</li>
            <li>About</li>
            <li>Admissions</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Notices */}
        <div>
          <h3>Notices</h3>
          <ul style={styles.list}>
            <li>Admissions Open 2026</li>
            <li>Sports Day – 15 April</li>
            <li>PTM – 10 April</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        © 2026 Bright Future Public School | All Rights Reserved
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "",
    padding: "30px 20px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  bottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #444",
    paddingTop: "10px",
    fontSize: "14px",
  },
};

export default Footer;