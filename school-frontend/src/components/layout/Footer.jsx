import React from "react";

const Footer = () => {
  return (
    <footer
      style={styles.footer}
      className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-500/50 text-white backdrop-blur-md dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
      <div style={styles.container}>
        
        {/* About */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">About School</h3>
          <p>
            Bright Future Public School provides quality education with modern
            teaching methods. We focus on academics, discipline, and overall
            development of students.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Contact</h3>
         
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@brightfuture.edu.in</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <ul style={styles.list}>
            <li>Home</li>
            <li>About</li>
            <li>Admissions</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Notices */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Notices</h3>
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
    padding: "32px 20px 20px",
    color: "white",
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
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "10px",
    fontSize: "14px",
  },
};

export default Footer;
