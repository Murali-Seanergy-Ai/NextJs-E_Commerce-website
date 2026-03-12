import axios from "axios"



export const getProducts =  async () => {
  try{
    const res  = await axios.get('http://localhost:3000/api/products')
    
    return res.data.Data
  }catch(error){
     console.error("Error fetching products:", error)
    throw error
  }
}

export const addToCart = async (productId:string,quantity:number) => {
  try{
  
    const res = await axios.post('http://localhost:3000/api/cart',{
      productId,
      quantity
    })
  
    return res.data.data
  }catch(error){
    console.error("Error adding to cart:", error)
    throw error
  }
}


export const getCartItems = async () => {
  try{
    const res = await axios.get('http://localhost:3000/api/cart')   
    console.log("Cart items response:", res.data) // Debug log to check the response structure
    return res.data.data
  }catch(error){
    console.error("Error fetching cart items:", error)
    throw error
  } 
}

