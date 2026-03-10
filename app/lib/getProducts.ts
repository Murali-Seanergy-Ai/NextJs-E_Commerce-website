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

