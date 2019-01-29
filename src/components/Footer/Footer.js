import React from "react";

import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="text-xs-center text-muted">
        Have questions or suggestions? Please contact us
        {" "}<a
          href="https://www.coffsun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
