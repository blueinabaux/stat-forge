import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const [logData, setLogData] = useState({
        email:"",
        password:"",
    })

    const addData = (e) => {
        const {name,value} = e.target;

        setLogData(() => {
            return{
                ...logData,
                [name]:value
            }
        })

    }

    console.log("User Credentials: ",logData);


    return ( 
        <>
            <div className="login-form h-[90vh] w-full bg-zinc-800 flex justify-center items-center ">
                <form className="form-login h-[80%] w-[30%] bg-[#181818] flex flex-col justify-center items-center  ">

                    <h1 className="login-text text-white font-bold text-[2vw]" >LOGIN</h1>


                    <div className="input-boxes h-[30%] w-full bg--500 flex flex-col justify-evenly items-center ">

                    <input 
                    onChange={addData}
                    value={logData.email}
                    className=" text-white outline-none w-[80%] px-[2vw] py-[2vh] bg-zinc-800 " id="email" name="email" type="email" placeholder="Email" />

                    <input
                    onChange={addData}
                    value={logData.password}
                     className=" text-white outline-none w-[80%]  px-[2vw] py-[2vh] bg-zinc-800 " id="password" name="password" type="password" placeholder="Password" />
                    </div>


                    <div className="forgot h-[12%] w-[80%] bg--500 flex justify-between items-start text-[#909090] text-[0.9vw]">
                        <h2>Forgot Password ?</h2>
                        <Link to="/register" >Don't have an Account ?</Link>

                    </div>


                    <button  className=" w-[80%] px-[2vw] py-[1vh] bg-white border-[1px] border-solid border-white hover:bg-transparent  hover:text-white font-bold" >Login</button>
                </form>
            </div>
        </>
     );
}
 
export default LoginPage;