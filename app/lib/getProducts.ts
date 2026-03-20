import axios from "axios"
import toast from "react-hot-toast"
import { api } from "./instanceApi"



export const registerUser = async (data:any) => {

  try{
    const res = await api.post(
      "/auth-register",
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
    const res = await api.post("/auth-login",data)
    console.log(res,"Api response")
    console.log(res.data.token,"token")
    localStorage.setItem("token",res.data?.token)
    localStorage.setItem("isLogin", "true")
    return res.data

  }catch(err:any){
    console.log(err)
     const message = err?.response?.data?.message || "Login Failed"
     throw new Error(message)

  }
}
export const logoutApi = async () => {
  try{
    const res = await api.post("/auth-logout")
   
    return res.data
  }catch(error:any){
    console.log("Error during logout:", error)
    const message = error?.response?.data?.message || "Logout failed. Please try again."
    throw new Error(message)
  }
}



export const getProducts =  async (search:any) => {
  try{
    const trimmed = typeof search === "string" ? search.trim() : ""
    
    // API route is `app/api/search/route.ts` which reads query param: `?searchTerm=...`
    // Always include the query param so it doesn't come through as `null`.
    const res = await api.get(`/search?searchTerm=${trimmed}`)

    // `app/api/products/route.ts` returns `Data`, while `app/api/search/route.ts` returns `data`.
    return res.data.Data ?? res.data.data
 
  }catch(error:any){
    
     console.log("Error fetching products:", error)
     const message = error?.response?.message || "Failed to fetch products"
     throw new Error(message)
   
  }
}

export const addToCart = async (productId:string,quantity:number) => {
  console.log(productId,quantity,"Adding to cart") // Debug log to check the product ID and quantity being added
  try{
    const res = await api.post('/cart',{
      productId,
      quantity
    })
    console.log(res,"add to cart response")
    return res.data.data
  }catch(error){
    console.log("Error adding to cart:", error)
    throw error
  }
}


export const getCartItems = async () => {
  try{
    const res = await api.get('/cart')   
    console.log(res,"get cart response")
    return res.data.data
  }catch(error:any){
    console.log("Error fetching cart items:", error)
    const  message = error?.response?.data?.message || "Failed to fetch cart items. Please try again." 
    throw new Error(message)
  } 
}

export const removeItemFromCart = async (Id:string) => {
  console.log(Id,"Item Id to remove") // Debug log to check the item ID being removed
  try{
    const res = await api.delete(`/cart?id=${Id}`)
    console.log(res,"remove from cart response")
    return res.data.data
  }catch(error:any){
    console.log("Error removing item from cart:", error.message)
    const message = error?.response?.data?.message || "Failed to remove item from cart. Please try again."  
    throw new Error(message)
  }
}
