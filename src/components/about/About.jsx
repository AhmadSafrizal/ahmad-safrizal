import React from 'react';
import './about.css';
import AboutImg from '../../assets/pp.jpg';
import CV from '../../assets/CV1.pdf';
import Info from './Info';

const About = () => {
  return (
    <section className="section about" id="about">
      <h2 className="section__title">
        About Me
      </h2>
      <span className="section__subtitle">
        My Introduction
      </span>
      <div className="about__container container grid">
        <img src={AboutImg} alt="" className="about__img" />

        <div className="about__data">
          <Info />

          <p className="about__description">
            I am a Bachelor of Information Systems and Technology student at Ivet University Semarang. Have internship experience in a state-owned company for 4 months. I am a responsible and reliable person.
          </p>

          <a href={CV} className="button button--flex">Download CV <i class='bx bx-file button__icon-file'></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About