import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/SignIn'
import Signup from './pages/SignUp'
import Home from './pages/Home'
import Navbar from './components/shared/Navbar'
import ProductInfo from './pages/ProductInfo'
import ProductbyCategory from './pages/ProductByCategory'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:slug" element={<ProductInfo/>} /> // single product info
        <Route path="/products/:category" element={<ProductbyCategory />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
