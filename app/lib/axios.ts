import axios from "axios"
import toast from "react-hot-toast"


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true //is used in Axios to allow the browser to send cookies, authentication headers, or TLS certificates with a request, especially when calling APIs from a Next.js frontend.

})

api.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response && error.response.status =="401"){
            toast.error("unAuthorized Error")
             window.location.assign("/login")
           
        }
        return Promise.reject(error)
    }
)

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(!token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

