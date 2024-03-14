import React from "react";
export default function NavbarAdm() {
  return (
    <div className="navbar bg-gray-500">
      <div className="flex-none">
        <div className="drawer bg-gray-500 ">
          <input
            id="my-drawer"
            type="checkbox"
            className="bg-gray-500 drawer-toggle"
          />
          <div className="btn btn-square btn-ghost">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-gray-500 drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side z-10">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <h1 className="text-2xl font-bold text-black ">Dashboard</h1>
              <li className="hover:bg-gey hover:text-white rounded-lg">
                <a href="/dashboard">Home</a>
              </li>
              <li className="hover:bg-gey hover:text-white rounded-lg">
                <a href="/dashboard/skill">Skill</a>
              </li>
              <li className="hover:bg-gey hover:text-white rounded-lg">
                <a href="/dashboard/project">Project</a>
              </li>
              <li className="hover:bg-gey hover:text-white rounded-lg">
                <a href="/dashboard/media">Media</a>
              </li>
              <li className="hover:bg-gey hover:text-white rounded-lg">
                <a href="/dashboard/blog">Blog</a>
              </li>
              <li className="bg-red-400 rounded-lg">
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 mx-5 flex justify-center items-center">
        <a href={"/"}>
          {/* <img src={logo} alt="" width={200} height={200} /> */}
          <p>Safrizal</p>
        </a>
      </div>
    </div>
  );
}
