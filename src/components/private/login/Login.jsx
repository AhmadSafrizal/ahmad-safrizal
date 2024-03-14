import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const loginUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenExpiration = sessionStorage.getItem("tokenExpiration");

    if (token && tokenExpiration) {
      const currentTime = new Date().getTime();

      if (currentTime < tokenExpiration) {
        navigate("/dashboard");
      } else {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tokenExpiration");
        sessionStorage.removeItem("userId");
      }
    }
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation(loginUser);

  const handleLogin = async () => {
    try {
      const { data } = await mutation.mutateAsync({ username, password });

      // console.log("Response Data:", data);

      const { token, userId } = data;
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;

      console.log("token", token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("tokenExpiration", expirationTime);
      sessionStorage.setItem("userId", userId);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form className="py-4 rounded-lg bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl bg-cover bg-center my-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn bg-zinc-500 text-white font-bold py-2 px-4 w-full rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <a href="/auth/register" className="text-xs text-gray-500 uppercase">
          or sign up
        </a>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </form>
  );
};

export default Login;
