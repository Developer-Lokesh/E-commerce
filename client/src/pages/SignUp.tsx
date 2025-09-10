
import { Link, useNavigate } from 'react-router-dom'
import style from '../style/auth.module.css'
import { useState } from 'react'

const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputHandler = (e:any) => {
    const eleName = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [eleName]: value });
  }

  const submitHandler = async (e:React.FormEvent) => {
    try {
      e.preventDefault();

      if(input.password !== input.confirmPassword){
        alert("Please enter a valid confirm password");
        return;
      }

      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.data.message || "SignUp failed!");
        return;
      }
      setInput({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/");
      
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <form onSubmit={submitHandler} className={style.body}>
      <div className={style.container}>
        <h1 className={style.topHeading}>SignUp</h1>
        <div className={style.subContainer}>
          <label className={style.label}>Name:-</label>
          <input type="text" placeholder="Enter your name" name="name" value={input.name} onChange={inputHandler} />
        </div>
        <div className={style.subContainer}>
          <label className={style.label}>Email:-</label>
          <input type="email" placeholder="Enter your Email" name="email" value={input.email} onChange={inputHandler} />
        </div>
        <div className={style.subContainer}>
          <label className={style.label}>Password:-</label>
          <input type="password" placeholder="Enter the password" name="password" value={input.password} onChange={inputHandler} />
        </div>
        <div className={style.subContainer}>
          <label className={style.label}>Confirm Password:-</label>
          <input type="password" placeholder="Enter the confirm password" name="confirmPassword" value={input.confirmPassword} onChange={inputHandler} />
        </div>
        <div className={style.subContainerbtn}>
          <button className={style.button}>SignUp</button>
          <p className={style.p}>Already have an account <Link to="/login">SignIn</Link> </p>
        </div>
      </div>
    </form>
  )
}

export default SignUp;