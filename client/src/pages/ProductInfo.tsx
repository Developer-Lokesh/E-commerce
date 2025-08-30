import ImageContainer from '@/components/shared/ImageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useFetch from '@/hooks/useFetch';
import useUserStore from '@/store/user.store';
import type { IProduct } from '@/types/types';
import { Heart, Loader, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
// import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const ProductInfo = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const {user, cart, addCartItem, removeCartItem} = useUserStore();
  const url = import.meta.env.VITE_SERVER_URL;
  const { data, loading } = useFetch(`${url}/product/${slug}`);
  
  const { data: products, loading: productsLoading } = useFetch(`${url}/products`);
  
  const [readMore, setReadMore] = useState(false);
  
  console.log(user, "productInfo")
  // console.log(slug)
  if (loading && !data) {
    return (
      <p>Loading</p>
    )
  }

  if (!data) {
    return (<p>No product found!</p>)
  }

  const addToCart = async () => {
    //my solution 
     if (loading) {
    toast("Please wait, loading user info...");
    return;
  }
    if(!user){
      navigate(`/login?redirect=/product/${slug}`);
      return;
    }
//  item in client cart
    addCartItem({
      item:{
        _id:data._id,
        title:data.title,
        price:data.price,
        mrp:data.mrp,
        images:[data.images[0]],
        slug:data.slug,
      },
      quantity:1,
    });

// add item into server cart

  try {
    const res = await fetch(`${url}/user/cart`, {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({item: data._id, quantity:1})
    });
    const json = await res.json();
    console.log("This is json", json)

    if(!json.success){
      alert("Something went wrong");
      removeCartItem(data._id);
      return false;
    }
    return true;
  } catch (error) {
    console.log(error || "Something went wrong");
    alert("Something went wrong")

    removeCartItem(data._id);
    return false;
  }
  }

  

  // console.log(data);

  if (loading || !data)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <Loader className="animate-spin" size={40} />
      </div>
    );

    const isinCart = cart?.some((item) => item.item._id === data._id);

    const handleBuyNow = async () => {
      // if user exist 
      if(!user){
        navigate(`/login?redirect=/product/${slug}`);
        return;
      }

      if(isinCart){
        navigate(`/cart`);
      } 
      else{
        const added = await addToCart();
        if(added) {
          navigate(`/cart`);
        }
      }
    };

  return (
    <div className='flex justify-center'>
    <div className="max-w-7xl w-full ">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="p-2 w-full">
          <ImageContainer data={data.images} />
        </div>
        <div className="w-full p-2">
          <Link to={`/products/${data.category.slug}`} className="text-blue-500 font-semibold">
            {data.category.name}
          </Link>
          <h1 className="text-2xl font-semibold py-3">{data.title}</h1>
          <p className={readMore ? "" : "line-clamp-3"}>{data.description}</p>
          <p className="text-blue-500 font-semibold cursor-pointer" onClick={() => setReadMore(!readMore)}>

            See {readMore ? "Less" : "More"}
          </p>

          <div className="py-6">
            <span className="font-semibold text-2xl">₹{data.price}</span>/
            <span className="line-through text-lg">₹{data.mrp}</span>
            <div className="text-xs italic">Inclusive of all taxes</div>
          </div>

         {/* ratting */}

          <div className="flex gap-2 w-full justify-between">
            <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer"
            onClick={isinCart ? () => navigate("/cart") : addToCart}>
              <ShoppingCart />  {isinCart ? "Added! Go to Cart" : "Add to cart"}
            </Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer" onClick={handleBuyNow}>Buy Now</Button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="text-sm italic">no reviews yet!</p>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">People also like this - </h1>
      </div>
      <div>
         {productsLoading && <p>loading products</p>}
        <div className="flex gap-2 flex-wrap">
          {products && products.map((product: any) => <OtherProduct key={product._id} {...product} />)}
        </div>
      </div>
    </div>
    </div>
  );
};

const OtherProduct = (data: IProduct) => {
  // console.log(data)
  return (


    <Link to={`/product/${data.slug}`} >
      <Card className="relative w-[200px] p-0 overflow-hidden gap-0">

        <div className="absolute top-2 right-2 cursor-pointer group">
          {/* Tooltip */}
          <span
            className="absolute left-1/2 top-full mt-2 px-2 py-1 text-sm 
               bg-white text-black rounded shadow 
               opacity-0 group-hover:opacity-100 
               -translate-x-10 transition"
          >
            Add To Wishlist
          </span>

          {/* Icon */}
          <Heart className="text-red-400" />
        </div>
        <div className="w-full h-[250px]">
          <img src={data?.images[0]?.url } alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
          <div className="pt-3">
            <span className="font-semibold">₹{data.price}</span>/<span className="line-through text-xs">₹{data.mrp}</span>
          </div>
        </div>
      </Card>
    </Link>


  );
};


export default ProductInfo