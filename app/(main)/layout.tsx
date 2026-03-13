import { Toaster } from "react-hot-toast";
import Navbar from "../component/navbar";




export default function MainLayout({ children, }:{children:React.ReactNode}) {
  return (
   
 <>
      <Navbar />
      {children}
      {Toaster && <Toaster position="top-right" reverseOrder={false} /> }
 </>
   
  );
}