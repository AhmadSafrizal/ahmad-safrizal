import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import Loading from "../loading/Loading";

const dataUser = async (user, setUserData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/contact`, {
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

const Contact = () => {
  const [userData, setUserData] = useState(null);
  const form = useRef();

  useEffect(() => {
    dataUser(null, setUserData);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_0wh6amf",
      "template_nmpu40w",
      form.current,
      "YF1AoFQ5lFzIdnuJ5"
    );
    e.target.reset();
  };

  return (
    <section className="section contact" id="contact">
      <h2 className="section__title">Get in touch</h2>
      <span className="section__subtitle">Contact Me</span>

      <div className="contact__container container grid">
        <div className="contact__content">
          <h3 className="contact__title">Talk to me</h3>

          <div className="contact__info">
            {userData.data.map((item, index) => (
              <div className="contact__card">
                <i className={`contact__card-icon ${item.icon}`}></i>

                <h3 className="contact__card-title">{item.name}</h3>
                <span className="contact__card-data">{item.value}</span>

                <a
                  key={index}
                  href={item.link}
                  className="contact__button"
                  target="_black"
                >
                  Write me{" "}
                  <i className="uil uil-arrow-right contact__button-icon"></i>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="contact__content">
          <h3 className="contact__title">Write me on your message</h3>

          <form className="contact__form" ref={form} onSubmit={sendEmail}>
            <div className="contact__form-div">
              <div className="contact__form-tag">Name</div>
              <input
                type="text"
                name="name"
                className="contact__form-input"
                placeholder="Insert your name"
              />
            </div>

            <div className="contact__form-div">
              <div className="contact__form-tag">Mail</div>
              <input
                type="email"
                name="email"
                className="contact__form-input"
                placeholder="Insert your email"
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <div className="contact__form-tag">Message</div>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                className="contact__form-input"
                placeholder="Write your message"
              ></textarea>
            </div>

            <button className="button button--flex">
              Send Message <i class="bx bx-send contact__button-send"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
