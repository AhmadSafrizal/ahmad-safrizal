import React from "react";

const Register = () => {
  return (
    <form
      //   onSubmit={handleSubmit}
      className="py-4 rounded-lg bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl bg-cover bg-center my-20"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
      <div className="flex p-8 gap-8">
        <div className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="username"
              placeholder="John-doe"
              //   value={username}
              //   onChange={handleUsernameChange}
            />
            {/* {!isUsernameValid ? (
              <span className=" text-[11px] text-red-500 ">
                Username should only contain lowercase letters, numbers, hyphens
                and minimum of 6 character.
              </span>
            ) : null} */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Surename
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="john Doe"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="description"
              name="description"
              placeholder="lorem ipsum dolor sit amet, consectetur"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profile"
            >
              Profile
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="profile"
              name="profile"
              placeholder="lorem ipsum dolor sit amet, consectetur"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="btn bg-zinc-500 text-white font-bold py-2 px-4 w-full rounded"
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <a href="/auth/login" className="text-xs text-gray-500 uppercase">
          Login Here
        </a>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </form>
  );
};

export default Register;
