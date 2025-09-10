// import { useFetch } from "@/hooks/useFetch";
// import { Card } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
// import { Bookmark } from "lucide-react";
// import type { IProduct } from "@/types/types";
// import { Bookmark } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProductbyCategory = () => {
  const { category } = useParams();
  const url = import.meta.env.VITE_SERVER_URL;
  const { data, loading } = useFetch(`${url}/products/${category}`);

if (loading) {
  return <p>Loading...</p>
}

if (!loading && !data) {
  return <p>someting went wrong!</p>
}

  // console.log(data, "product by category");
  // console.log(data.category.name);
  // console.log(data.products[1].title);
  // console.log(data.products[0].price);
  // console.log(data.products[1].mrp);


  return (
    <div>data.category.name
    <div>
      
    </div>
     {/* <Link to={`/product/${data.category}`} >
       <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
         <div className="absolute top-2 right-2 cursor-pointer">
           <Bookmark className="text-red-400" />
         </div>
         <div className="w-full h-[250px]">
           <img src={data.images[0].url} alt="" className="w-full h-full object-cover" />
         </div>
         <div className="p-2">
           <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
           <div className="pt-3">
             <span className="font-semibold">₹{data.price}</span>/<span className="line-through text-xs">₹{data.mrp}</span>
           </div>
         </div>
       </Card>
     </Link> */}
</div>

  )
  
};



export default ProductbyCategory;