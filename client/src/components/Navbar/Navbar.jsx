import { Link } from "react-router-dom";
import sf from '../../assets/SF logo.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user || {});


    const toPage = (link) => {
        navigate(link)
    }

    
    // const clearStorage = () => {
    // };

    return ( 
        <>
            <div className="navbar h-[10vh] w-full flex justify-between items-center px-[2vw]">
                <img onClick={() => {
                    toPage('/')
                }}
                 className="h-[3vw] w-[3vw] cursor-pointer "  src={sf} alt="" />
                 <h1 className="text-[1.5vw] bg-green-700 px-[2vw] text-white" >{user.handle}</h1>
                <div className="nav-right h-full w-[50%] flex justify-around items-center ">
                    <Link to="/" className="text-white hover:text-[#6E88B6]" >Dashbaord</Link>
                    <Link to='/allLinks' className="text-white hover:text-[#6E88B6]" >Links</Link>
                    <Link className="text-white hover:text-[#6E88B6]" >Friends</Link>
                    <button onClick={() => {
                    toPage('/register')
                    }} 
                    className="text-[#181818] bg-white px-[2vw] py-[1vh] hover:bg-[#6E88B6] hover:text-white " >
                        LogIn
                    </button>
                    
                </div>
            </div>
        </>
     );
}
 
export default Navbar;