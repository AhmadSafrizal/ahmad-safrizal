import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Safrizal</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">About</a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">Projects</a>
          </li>
        </ul>

        <div className="footer__social">
          <a href="https://instagram.com/ahmad_safrizal_?igshid=ZGUzMzM3NWJiOQ==" className="footer__social-link" target="_black">
            <i class="uil uil-instagram"></i>
          </a>
          
          <a href="https://www.linkedin.com/in/ahmad-safrizal-42a179201" className="footer__social-link" target="_black">
            <i class="uil uil-linkedin-alt"></i>
          </a>

          <a href="https://github.com/AhmadSafrizal" className="footer__social-link" target="_black">
            <i class="uil uil-github-alt"></i>
          </a>
        </div>

        <span className="footer__copy">
          &#169; Ahmad Safrizal. All rights reserved
        </span>
      </div>
    </footer>
  )
}

export default Footer