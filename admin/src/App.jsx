import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Products from './pages/Product';
import Categories from './pages/Category';
import Users from './pages/User';
import Orders from './pages/Order';
import Login from './pages/Login';
import ProductInfo from './pages/ProductInfo';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/product/:slug' element={<ProductInfo/>}/>
        <Route path='/categories' element={<Categories/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
