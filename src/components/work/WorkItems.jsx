import React, { useState } from 'react';

const WorkItems = ({item}) => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <>
      <div className="work__card" key={item.id}>
        <img src={item.image} alt="" className='work__img' />
        <h3 className="work__title">{item.title}</h3>
        <span className="work__button"  onClick={() => toggleTab(item.id)}>
          More <i className="uil uil-arrow-right work__button-icon"></i>
        </span>
      </div>
    
      <div className={toggleState === item.id ? "work__modal active-modal" : "work__modal"}>
        <div className="work__modal-content">
          <i onClick={() => toggleTab(0)} className="uil uil-times work__modal-close"></i>

          <h3 className="work__modal-title">{item.title}</h3>
          <img src={item.image} alt="" className='work__modal-img' />
          <p className="work__modal-description">{item.desc}</p>

        </div>
      </div>
    </>
  )
}

export default WorkItems