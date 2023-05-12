import React from 'react';
import MyWork from './MyWork';
import './work.css';

const Work = () => {
  return (
    <section className="section work" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent works</span>

      <MyWork />
    </section>
  )
}

export default Work