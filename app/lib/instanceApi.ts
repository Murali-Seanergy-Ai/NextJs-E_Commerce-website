import axios from "axios"
import toast from "react-hot-toast"

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true
})

/* RESPONSE INTERCEPTOR */

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
      console.log(error,"Error in API response") // Debug log to check the error object
    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized Error")
      window.location.assign("../../login")
    }

    return Promise.reject(error)
  }
)

/* REQUEST INTERCEPTOR */

api.interceptors.request.use((config) => {
if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

