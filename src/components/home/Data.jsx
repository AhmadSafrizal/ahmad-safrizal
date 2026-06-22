import React from 'react'

const Data = () => {
  return (
    <div className="home__data">
      <h1 className="home__title">Ahmad Safrizal</h1>
      <h3 className="home__subtitle">Web Developer — building fast, accessible websites</h3>
      <p className="home__description">I'm a Web Developer based in Semarang, passionate about building user-centered web experiences.</p>

      <div className="home__cta">
        <a href="#contact" className="button" aria-label="Contact Ahmad Safrizal">Contact Me <i className='bx bx-send home__button-icon'></i></a>
        <a href="#portfolio" className="button button--outline" aria-label="See my work">See My Work</a>
      </div>
    </div>
  )
}

export default Data