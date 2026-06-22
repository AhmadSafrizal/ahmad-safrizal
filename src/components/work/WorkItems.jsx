import React, { useState } from 'react';

const WorkItems = ({ item }) => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      {/* CARD UTAMA PORTOFOLIO */}
      <div className="work__card" key={item.id}>
        <img
          src={item.image}
          alt={item.title ? `${item.title} screenshot` : 'Project screenshot'}
          className="work__img"
          loading="lazy"
          decoding="async"
        />
        <h3 className="work__title">{item.title}</h3>
        <button
          type="button"
          className="work__button"
          onClick={() => toggleTab(item.id)}
          aria-expanded={toggleState === item.id}
          aria-controls={`work-modal-${item.id}`}
          aria-label={`Open details for ${item.title}`}
        >
          More <i className="uil uil-arrow-right work__button-icon"></i>
        </button>
      </div>

      {/* MODAL DETAIL STUDI KASUS */}
      <div
        id={`work-modal-${item.id}`}
        className={toggleState === item.id ? "work__modal active-modal" : "work__modal"}
        role="dialog"
        aria-modal={toggleState === item.id}
        aria-hidden={toggleState !== item.id}
      >
        <div className="work__modal-content">
          <i onClick={() => toggleTab(0)} className="uil uil-times work__modal-close" role="button" aria-label="Close details"></i>

          <h3 id={`work-modal-title-${item.id}`} className="work__modal-title">{item.title}</h3>
          <p className="work__modal-description">{item.desc}</p>

          {/* INFORMASI STUDI KASUS TAMBAHAN */}
          {item.details && (
            <div className="work__modal-details">
              <div className="work__detail-item">
                <strong>Role:</strong> <span>{item.details.role}</span>
              </div>

              <div className="work__detail-item">
                <strong>Tech Stack:</strong>
                <div className="work__tech-tags">
                  {item.details.tech.map((tech, idx) => (
                    <span key={idx} className="work__tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="work__detail-item">
                <strong>Project Goal:</strong>
                <p>{item.details.goal}</p>
              </div>

              <div className="work__detail-item">
                <strong>Value Delivered / Result:</strong>
                <p>{item.details.result}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkItems;