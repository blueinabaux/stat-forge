import axios from 'axios';
import { useSelector } from 'react-redux';


const Dashboard = () => {

    const { user } = useSelector(state => state.user || {});
    console.log("CURRENT USER: ",user);

    if (!user || Object.keys(user).length === 0) {
        return <div>Loading or No User Data</div>;
    }

    return ( 
        <>
            <div className="dash-main h-[90vh] w-full bg--700 flex flex-col justify-center items-center ">
                <div className="top-dash h-[55%] w-full flex justify-center bg--400 items-center ">
                    <div className="top-left-dash h-full w-[30%] bg--700 flex flex-col justify-around items-center ">
                        <div className="rating-card h-[45%] w-[93%] bg-[#6E88B6] flex flex-col justify-around items-start px-[2vw] ">
                            <h1 className='text-white' >RATING</h1>

                            <h1 className='text-white text-[4vw]' >{user.rating}</h1>
                        </div>
                        <div className="rating-card h-[45%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                        <h1 className='text-white' >RANK</h1>

                        <h1 className='text-white text-[4vw]' >{user.rank}</h1>
                        </div>
                    </div>
                    <div className="top-right-dash h-full w-[70%] bg--700 flex justify-evenly items-center ">
                        <div className="pie-card h-[95%] w-[35%] bg-[#24242E]">

                        </div>
                        <div className="graph-card h-[95%] w-[60%] bg-[#24242E]">

                        </div>
                    </div>

                </div>
                <div className="bottom-dash h-[45%] w-full flex justify-center bg--400 items-center ">
                    <div className="bottom-left-dash h-full w-[30%] bg--700 flex flex-col justify-evenly items-center ">
                        <div className="rating-card h-[95%] w-[93%] bg-[#6E88B6]">

                        </div>
                       
                    </div>
                    <div className="bottom-right-dash h-full w-[70%] bg--700 flex flex-col justify-evenly items-center ">
                        <div className="rating-card h-[95%] w-[97%] bg-[#24242E]">

                        </div>
                    </div>

                </div>
            </div>
        </>
     );
}
 
export default Dashboard;