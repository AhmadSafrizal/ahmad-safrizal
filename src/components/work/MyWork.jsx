import React, { useEffect, useState } from "react";
import WorkItems from "./WorkItems";

const MyWork = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [item, setItem] = useState({ name: "all" });
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);

  const fetchData = async (category = null) => {
    try {
      const categoryResponse = await fetch(
        "http://localhost:8080/api/category-project",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch category data");
      }

      const categoryData = await categoryResponse.json();
      setCategoryData(categoryData);

      let projectsEndpoint = "http://localhost:8080/api/project";

      if (category) {
        projectsEndpoint += `?category=${category}`;
      }

      const projectResponse = await fetch(projectsEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!projectResponse.ok) {
        throw new Error("Failed to fetch project data");
      }

      const projectData = await projectResponse.json();
      setProjectsData(projectData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (projectsData) {
      const mappedProjects = projectsData.data.map((project) => ({
        id: project.id,
        image: project.photo,
        title: project.name,
        category: project.category_project.name,
        desc: project.description,
      }));
      setProjects(mappedProjects);
    }
  }, [projectsData]);

  const handleClick = (e, index, categoryId) => {
    setItem({ name: e.target.textContent });
    setActive(index);
    fetchData(categoryId);
  };

  return (
    <div>
      <div className="work__filters">
        {categoryData &&
          categoryData.data.map((item, index) => (
            <span
              onClick={(e) => {
                handleClick(e, index, item.id);
              }}
              className={`${active === index ? "active-work" : ""} work__item`}
              key={index}
            >
              {item.name}
            </span>
          ))}
      </div>

      <div className="work__container container grid">
        {projects.map((item) => (
          <WorkItems item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MyWork;
