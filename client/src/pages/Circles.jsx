
const Circles = (props) => {

    let num = props.num;
    let sodf= 400-(4*num);
    

    const circleStyles = {
        "fill": "none",
        "stroke": "rgb(59 130 246)",
        "strokeWidth": "20px",
        "strokeDasharray": "400",
        "strokeDashoffset": sodf,
        "animation": "anim 1s linear forwards",
        "backgroundColor":"red"
    }

    return ( 
        
        <>
            <div className="skills h-[22vh] w-[22vh] relative  justify-center items-center bg-green-90">
                <div className='outercircle1 h-[22vh] w-[22vh] rounded-full border-2 border-[white] border-solid  flex justify-center items-center p-[20px]'>
                    <div className='innercircle h-[16vh] w-[16vh] rounded-full border-2 border-[white] border-solid flex justify-center items-center'>
                        <div className = "number font-[600] text-white">
                            {num}%    
                        </div>  
                    </div> 
                    
                    
                </div>
                <svg className=" top-[0%] left-[0%] absolute " xmlns ="http://www.w3.org/2000/svg"version="1.1" width="22vh" height ="22vh">

                    <circle style={circleStyles} className="" cx="77" cy="77" r="64" stroke-linecap="round"/>

                    </svg>
            </div>
            
                
            
        </>
     );
}
 
export default Circles;