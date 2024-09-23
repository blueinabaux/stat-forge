import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";

const Layout = () => {
    return ( 
        <>
            <div className="layout h-[100vh] w-[100vw] bg-transparent flex flex-col justify-center items-center ">
                <Navbar/>
                <Outlet/>
            </div>
        </>
     );
}
 
export default Layout;