import React, { useEffect, useState } from "react";
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

const Social = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dataUser(null, setUserData);
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="home__social">
      {userData.data.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="home__social-icon"
          target="_black"
        >
          <i className={`uil uil-${item.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
