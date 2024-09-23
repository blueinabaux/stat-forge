
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const SignUp = () => {

    const [uData, setUdata] = useState({
        name:"",
        email:"",
        password:"",
        conPassword:""
    });

    console.log(uData);

    const addChange = (e) => {
        const {name,value} = e.target;

        setUdata(() => {
            return{
                ...uData,
                [name]:value
            }
        })
    }

    return ( 
        <>
            <div className="signup-form h-[90vh] w-full bg-zinc-800 flex justify-center items-center ">
                <form className="form-signup h-[90%] w-[30%] bg-[#181818] flex flex-col justify-center items-center ">

                    <h1 className="login-text text-white font-bold text-[2vw]" >SIGNUP</h1>

                    <div className="input-boxes h-[50%] w-full bg--500 flex flex-col justify-evenly items-center ">

                    <input
                    onChange={addChange}
                    value={uData.name}
                     className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="name" name="name" type="text" placeholder="Your name" />
                    <input
                    onChange={addChange}
                    values={uData.email}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="email" name="email" type="email" placeholder="Email" />
                    <input
                    onChange={addChange}
                    values={uData.password}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="password" name="password" type="password" placeholder="Password" />
                    <input
                    onChange={addChange}
                    values={uData.conPassword}
                    className=" text-white outline-none w-[80%]  px-[2vw] py-[1.5vh] bg-zinc-800 " id="conPassword" name="conPassword" type="password" placeholder="Confirm Password" />

                    </div>

                    <div className="forgot h-[10%] w-[80%] bg--500 flex justify-between items-start text-[#909090] text-[0.9vw]">
                        <Link to="/login" >Have an Account ?</Link>
                    </div>

                    <button  className=" w-[80%] px-[2vw] py-[1vh] bg-white border-[1px] border-solid border-white hover:bg-transparent  hover:text-white font-bold" >Signup</button>
                </form>
            </div>
        </>
     );
}
 
export default SignUp;