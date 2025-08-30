import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/SignIn'
import Signup from './pages/SignUp'
import Home from './pages/Home'
import Navbar from './components/shared/Navbar'
import ProductInfo from './pages/ProductInfo'
import ProductbyCategory from './pages/ProductByCategory'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Order from './pages/Order'
import Checkout from './pages/Checkout'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/product/:slug" element={<ProductInfo/>} /> // single product info
        <Route path="/products/:category" element={<ProductbyCategory />} />

      <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Order />} />

        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
