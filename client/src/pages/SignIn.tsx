import { Link, useNavigate } from 'react-router-dom'
import style from '../style/auth.module.css'
import { useState } from 'react'
const SignIn = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const inputHandler = (e:any) => {
    const eleName = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [eleName]: value });
  }

  const submitHandler = async (e:React.FormEvent) => {
    try {
      e.preventDefault();
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(input)
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong")
      }

      setInput(
        {
          email: "",
          password: ""
        }
      );

      navigate("/");

    } catch (error) {
      console.log(error)
      return;
    }
  }

  return (
    <form onSubmit={submitHandler} className={style.body}>
      <div className={style.container}>
        <h1 className={style.topHeading}>Login</h1>
        <div className={style.subContainer}>
          <label className={style.label}>Email:-</label>
          <input type="email" placeholder="Enter your Email" name='email' value={input.email} onChange={inputHandler} />
        </div>
        <div className={style.subContainer}>
          <label className={style.label}>Password:-</label>
          <input type="password" placeholder="Enter the password" name='password' value={input.password} onChange={inputHandler} />
        </div>
        <div className={style.subContainerbtn}>
          <button className={style.button}>Login</button>
          <p className={style.p}>Don't have an account <Link to="/signup">SignUp</Link> </p>
        </div>
      </div>
    </form>
  )
}

export default SignIn;