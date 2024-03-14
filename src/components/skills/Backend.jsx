import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";

const backendSkill = async (user, setSkillData) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/skill?category=65e82fcad6d5ec5f44539263`,
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
    setSkillData(responseData);
    console.log(responseData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const Backend = () => {
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    backendSkill(null, setSkillData);
  }, []);

  if (!skillData) {
    return <Loading />;
  }

  const skills = skillData.data.map((skill, index) => {
    const isOdd = index % 2 === 1;
    const columnClass = isOdd ? "skills__group--right" : "skills__group--left";

    return (
      <div className={`skills__group ${columnClass}`} key={skill.id}>
        <div className="skills__data">
          <i class="bx bx-badge-check skills__icon"></i>
          <div>
            <h3 className="skills__name">{skill.name}</h3>
            <span className="skills__level">{skill.level_skill.name}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="skills__content">
      <h3 className="skills__title">Backend Developer</h3>

      <div className="skills__box">{skills}</div>
    </div>
  );
};

export default Backend;
