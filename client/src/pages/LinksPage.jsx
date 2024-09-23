
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";



const LinksPage = () => {

    const [ulinks, setLinks] = useState({
        leetcode:"",
        codeforces:"",
        codechef:"",
        gfg:""
    });

    const navigate = useNavigate();
    const toPage = (link) => {
        navigate(link)
    }

    const dispatch = useDispatch();

    // console.log(ulinks);

    const addChange = (e) => {
        const {name,value} = e.target;

        setLinks(() => {

            return{
                ...ulinks,
                [name]:value
            }
        })
    }

    const [userData, setUserData] = useState(null);

    
    const getCodeForcesUser = async () => {
        if (!ulinks.codeforces) {
            console.log("Codeforces username is required.");
            return;
        }
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.info?handles=${ulinks.codeforces}&checkHistoricHandles=false`
            );
            if (response.data && response.data.result) {

                setUserData(response.data.result); // Update userData state
                console.log("API RESPONSE DATA: ", response.data.result);
                dispatch(setUser(response.data.result[0])); // Dispatch user data
            }
            else{
                console.log("NO RESPONSE")
            }
        } catch (error) {
            console.log("ERROR IN LINKS: ", error.message);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await getCodeForcesUser();

         if (userData) {
            navigate("/"); 
        }
    };



    return ( 
        <>
            <div className="LinksPage-form h-[90vh] w-full bg-[#181818] flex justify-center items-center ">
                <form
                onSubmit={handleSubmit}
                 className="form-LinksPage h-[100%] w-[50%] bg-[#181818] flex flex-col justify-center items-center ">

                    <h1 className="link-text text-white font-bold text-[2vw]" >Link your accounts</h1>


                    <div className="input-boxes h-[50%] w-full bg--500 flex flex-col justify-evenly items-center ">

                    <input
                    onChange={addChange}
                    value={ulinks.leetcode}
                     className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="leetcode" name="leetcode" type="text" placeholder="Leetcode Username" />
                    <input
                    onChange={addChange}
                    values={ulinks.codeforces}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="codeforces" name="codeforces" type="text" placeholder="CodeForces Username" />
                    <input
                    onChange={addChange}
                    values={ulinks.codechef}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="codechef" name="codechef" type="text" placeholder="CodeChef Username" />
                    <input
                    onChange={addChange}
                    values={ulinks.gfg}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="gfg" name="gfg" type="text" placeholder="GFG Username" />

                    </div>

                    <button
                    type="submit"
                    
                    className=" w-[20%] px-[2vw] py-[1vh] bg-white border-[1px] border-solid border-white hover:bg-transparent  hover:text-white font-bold" >Done</button>


                    
                </form>
            </div>
        </>
     );
}
 
export default LinksPage;