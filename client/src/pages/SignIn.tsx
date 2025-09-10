import { cn, url } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import withAuth from "@/components/shared/withAuth";

function SignIn() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex h-[calc(100vh-60px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm redirect={searchParams.get("redirect")} />
      </div>
    </div>
  );
}

function LoginForm({ redirect }: { redirect: string | null }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        // show toast
        toast.error(data.error);
        return;
      }

      // show toast
      toast.success(data.message);

      // set token in local storage
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refToken", data.data.refreshToken);

      window.location.href = redirect || "/";
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(SignIn, false);

// import { Link, useNavigate } from 'react-router-dom'
// import style from '../style/auth.module.css'
// import { useState } from 'react'
// const SignIn = () => {
//   const navigate = useNavigate()
//   const [input, setInput] = useState({
//     email: "",
//     password: ""
//   });

//   const inputHandler = (e:any) => {
//     const eleName = e.target.name;
//     const value = e.target.value;

//     setInput({ ...input, [eleName]: value });
//   }

//   const submitHandler = async (e:React.FormEvent) => {
//     try {
//       e.preventDefault();
//       const url = import.meta.env.VITE_SERVER_URL;
//       const res = await fetch(`${url}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify(input)
//       });
//       const data = await res.json();
//       console.log(data, "Sign in Page")

//       if (!data.success) {
//         alert(data.message || "Something went wrong")
//       }

//       setInput(
//         {
//           email: "",
//           password: ""
//         }
//       );

//       navigate("/");

//     } catch (error) {
//       console.log(error)
//       return;
//     }
//   }

//   return (
//     <form onSubmit={submitHandler} className={style.body}>
//       <div className={style.container}>
//         <h1 className={style.topHeading}>Login</h1>
//         <div className={style.subContainer}>
//           <label className={style.label}>Email:-</label>
//           <input type="email" placeholder="Enter your Email" name='email' value={input.email} onChange={inputHandler} />
//         </div>
//         <div className={style.subContainer}>
//           <label className={style.label}>Password:-</label>
//           <input type="password" placeholder="Enter the password" name='password' value={input.password} onChange={inputHandler} />
//         </div>
//         <div className={style.subContainerbtn}>
//           <button className={style.button}>Login</button>
//           <p className={style.p}>Don't have an account <Link to="/signup" className='text-blue-600'>SignUp</Link> </p>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default SignIn;