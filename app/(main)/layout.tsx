import Navbar from "../component/navbar";


export default function MainLayout({ children, }:{children:React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}