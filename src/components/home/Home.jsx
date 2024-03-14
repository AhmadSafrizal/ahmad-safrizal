import React, { useEffect, useState } from "react";
import "./home.css";
import Social from "./Social";
import ScrollDown from "./ScrollDown";
import Loading from "../loading/Loading";

const dataUser = async (user, setUserData) => {
  try {
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

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dataUser(null, setUserData);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  const bg = {
    backgroundImage: `url(${userData.data.photo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <Social />

          <div className="home__img" style={bg}></div>

          <div className="home__data">
            <h1 className="home__title">{userData.data.name}</h1>
            <h3 className="home__subtitle">Web Developer</h3>
            <p className="home__description">{userData.data.profile}</p>
            <a href="#contact" className="button button--flex">
              Say Hello <i className="bx bx-send home__button-icon"></i>
            </a>
          </div>
        </div>

        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
