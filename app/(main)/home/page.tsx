

import Image from "next/image";
import {getProducts} from "../../lib/getProducts"
import ProductCard from "../../component/productCard";


export default  async function Home() {

  
    const products = await  getProducts()
     
  return (
  <div className="bg-slate-400">
    <ProductCard products={ products}/>
</div>
  );
}
