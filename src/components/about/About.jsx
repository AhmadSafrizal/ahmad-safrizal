import React, { useEffect, useState } from "react";
import "./about.css";
import AboutImg from "../../assets/pp.jpg";
import CV from "../../assets/CV1.pdf";
import Info from "./Info";
import Loading from "../loading/Loading";

const dataUser = async (user, setUserData) => {
  try {
    const baseURL = process.env.BASE_URL;
    const id = process.env.BASE_ID;

    const response = await fetch(
      `http://localhost:8080/api/user/65e06c8c871f450d88856016`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

const About = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dataUser(null, setUserData);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <section className="section about" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My Introduction</span>
      <div className="about__container container grid">
        <img src={userData.data.photo} alt="" className="about__img" />

        <div className="about__data">
          <Info />

          <p className="about__description">{userData.data.description}</p>

          <a href={CV} className="button button--flex">
            Download CV <i className="bx bx-file button__icon-file"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
