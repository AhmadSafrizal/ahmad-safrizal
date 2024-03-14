import React, { useEffect, useState } from "react";
import "./footer.css";
import Loading from "../loading/Loading";

const dataUser = async (user, setUserData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/social`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    setUserData(responseData);
    // console.log(responseData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const Footer = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dataUser(null, setUserData);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Safrizal</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>
        </ul>

        <div className="footer__social">
          {userData.data.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="footer__social-link"
              target="_black"
            >
              <i className={`uil uil-${item.icon}`}></i>
            </a>
          ))}
        </div>

        <span className="footer__copy">
          &#169; Ahmad Safrizal. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
