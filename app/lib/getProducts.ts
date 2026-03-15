import axios from "axios"
import toast from "react-hot-toast"


export const registerUser = async (data:any) => {

  try{
    const res = await axios.post(
      "http://localhost:3000/api/auth-register",
      data
    )
 console.log(res.data) // Debug log to check the response structure
    return res.data
  }catch(error:any){

    const message =
      error?.response?.data?.message ||
      "Registration failed. Please try again."

   

    throw message
  }
};

export const loginApi = async (data:any)=>{
  try{
    const res = await axios.post("http://localhost:3000/api/auth-login",data)
    console.log(res,"Api response")
    console.log(res.data.token,"token")
    localStorage.setItem("token",res.data?.token)
    return res.data

  }catch(err:any){
    console.log(err)
     const message = err?.response?.data?.message || "Login Failed"
     throw new Error(message)

  }
}



export const getProducts =  async () => {
  try{
    const res  = await axios.get('http://localhost:3000/api/products')
      
    return res.data.Data
  }catch(error){
     console.error("Error fetching products:", error)
   
  }
}

export const addToCart = async (productId:string,quantity:number) => {
  try{
  
    const res = await axios.post('http://localhost:3000/api/cart',{
      productId,
      quantity
    })
    console.log(res,"Get Products")
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

