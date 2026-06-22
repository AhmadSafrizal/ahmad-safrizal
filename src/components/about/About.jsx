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
            An Information Systems and Technology graduate from Ivet University Semarang with over 2.5 years of professional experience in software development. Proven track record in building and maintaining enterprise-grade applications, ranging from frontend redevelopments for healthcare financial systems to full-stack ERP architecture. Grounded in early experience from a 4-month internship at a prominent state-owned company (BUMN), I have evolved into a reliable, highly responsible developer capable of delivering high-quality, end-to-end web solutions both independently and within collaborative teams.
          </p>

          <a href={CV} className="button button--flex">Download CV <i class='bx bx-file button__icon-file'></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About