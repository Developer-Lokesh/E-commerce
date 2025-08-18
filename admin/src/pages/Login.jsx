import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.password) {
      alert("Email and password is required!");
      return;
    }
    try {
      setLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error);
        return;
      }
      if (data.data.user.role !== "admin") {
        alert("you are not an admin");
        return;
      }
      const token = data.data.accessToken;
      const refToken = data.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refToken", refToken);
      window.location.href = "/";
      console.log(data);
    } catch (error) {
      console.log("error - ", error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = ("/")
    }
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={submitHandler} className='border border-gray-300 p-5 shadow-2xl flex flex-col gap-2'>
        <h1 className='font-bold text-3xl text-center font-sans  mb-5'>Login</h1>
        <InputField value={formState.email} update={setFormState} label="Email" type="email" placeholder="Enter the Email" />
        <InputField value={formState.password} update={setFormState} label="password" type="password" placeholder="Enter the password" />

        <div>
          <button disabled={loading} className='bg-blue-400 outline-none text-white w-full rounded text-sm py-1 font-bold disabled:bg-gray-400 disabled:cursor-progress'>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
};

const InputField = ({ label, placeholder, type, value, update }) => {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='text-[16px]' >{label}</span>
      <Inputbox value={value} update={update} type={type} placeholder={placeholder} className="border-gray-300 rounded text-[12px] p-1" />
    </div>
  )
}

const Inputbox = ({ type, placeholder, value, update }) => {
  return <input type={type} name={type} placeholder={placeholder}
    onChange={(e) => update((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
    className="border border-gray-300 rounded" />
}

export default Login;