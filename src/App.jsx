import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/private/login/Login";
import Register from "./components/private/register/Register";
import MainUser from "./components/private/main/Main";
import HomeUser from "./components/private/main/home/Home";
import SkillUser from "./components/private/main/skill/Skill";
import ProjectUser from "./components/private/main/project/Project";
import MediaUser from "./components/private/main/media/Media";
import BlogUser from "./components/private/main/blog/Blog";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/dashboard" element={<MainUser />}>
        <Route index element={<HomeUser />} />
        <Route path="skill" element={<SkillUser />} />
        <Route path="project" element={<ProjectUser />} />
        <Route path="blog" element={<BlogUser />} />
        <Route path="media" element={<MediaUser />} />
      </Route>
    </Routes>
  );
}

export default App;
