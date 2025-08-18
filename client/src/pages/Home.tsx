import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Button variant={"destructive"} className="bg-blue-400 hover:bg-blue-600 hover:text-2xl">Hello</Button>
      <h1 className="text-6xl">Home</h1>
      <p> <Link to="/login">SignIn</Link></p>
      <p> <Link to="/signup">SignUp</Link></p>
    </div>
  )
}

export default Home;