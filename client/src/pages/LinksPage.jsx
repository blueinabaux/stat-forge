import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import { setContest } from "../redux/slice/contestSlice";
import { setProblems } from "../redux/slice/problemsSlice";
import { setLeetCodeUser } from "../redux/slice/leetCodeSlice"; // Import the LeetCode action
import { setCodeChefUser } from "../redux/slice/codeChefSlice"; // Import CodeChef action

const LinksPage = () => {
    const [ulinks, setLinks] = useState({
        leetcode: "",
        codeforces: "",
        codechef: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState(null);
    const [userContest, setUserContest] = useState(null);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);

    const addChange = (e) => {
        const { name, value } = e.target;
        setLinks((prev) => ({ ...prev, [name]: value }));
    };

    // Fetch Codeforces user data
    const getCodeForcesUser = async () => {
        if (!ulinks.codeforces) {
            console.log("Codeforces username is required.");
            return;
        }
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.info?handles=${ulinks.codeforces}`
            );
            if (response.data && response.data.result) {
                setUserData(response.data.result); // Update userData state
                console.log("Codeforces User Data: ", response.data.result);
                dispatch(setUser(response.data.result[0])); // Dispatch user data to Redux
            } else {
                console.log("No response from Codeforces API.");
            }
        } catch (error) {
            console.log("Error fetching Codeforces user: ", error.message);
        }
    };

    // Fetch Codeforces contest data
    const getUserContests = async () => {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.rating?handle=${ulinks.codeforces}`
            );
            if (response.data && response.data.result) {
                setUserContest(response.data.result);
                console.log("Codeforces Contest Data: ", response.data.result);
                dispatch(setContest(response.data.result)); // Dispatch contest data to Redux
            }
        } catch (error) {
            console.log("Error fetching Codeforces contests: ", error.message);
        }
    };

    // Fetch Codeforces solved problems
    const fetchUserSubmissions = async () => {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${ulinks.codeforces}`
            );
            if (response.data && response.data.result) {
                const solved = response.data.result
                    .filter((submission) => submission.verdict === "OK")
                    .map((submission) => ({
                        contestId: submission.problem.contestId,
                        index: submission.problem.index,
                    }));

                setSolvedProblems(solved);
                console.log("Solved Problems: ", solved);

                dispatch(setProblems(solved)); // Ensure this is a valid array
            }
        } catch (error) {
            console.log("Error fetching Codeforces submissions: ", error.message);
        }
    };

    // Fetch LeetCode user data
    const getLeetCodeUser = async () => {
        if (!ulinks.leetcode) {
            console.log("LeetCode username is required.");
            return;
        }
        try {
            const response = await axios.get(
                `https://leetcode-api-faisalshohag.vercel.app/${ulinks.leetcode}`
            );
            if (response.data) {
                console.log("LeetCode API Response: ", response.data);
                dispatch(setLeetCodeUser(response.data)); // Dispatch LeetCode data to Redux
            } else {
                console.log("No response from LeetCode API.");
            }
        } catch (error) {
            console.log("Error fetching LeetCode user: ", error.message);
        }
    };

    // Fetch CodeChef user data
    const getCodeChefUser = async () => {
        if (!ulinks.codechef) {
            console.log("CodeChef username is required.");
            return;
        }
        try {
            const response = await axios.get(
                `https://codechef-api.vercel.app/handle/${ulinks.codechef}`
            );
            if (response.data) {
                console.log("CodeChef API Response: ", response.data);

                // dispatch(setCodeChefUser(response.data));
                const { name: user, stars, currentRating: rating, countryRank: rank } = response.data;

            // Dispatch CodeChef data to Redux with matching fields
            dispatch(
                setCodeChefUser({
                    user,
                    stars,
                    rating,
                    rank,
                    
                }));// Dispatch CodeChef data to Redux
            } else {
                console.log("No response from CodeChef API.");
            }
        } catch (error) {
            console.log("Error fetching CodeChef user: ", error.message);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare the payload
        const platformCredentials = [
            { platform: "leetcode", platformUsername: ulinks.leetcode },
            { platform: "codeforces", platformUsername: ulinks.codeforces },
            { platform: "codechef", platformUsername: ulinks.codechef },
            
        ];
    
        // Loop through each platform and store the credentials
        try {
            for (const credential of platformCredentials) {
                if (credential.platformUsername) {
                    await axios.post("http://localhost:8000/platform", {
                        platform: credential.platform,
                        platformUsername: credential.platformUsername
                    });
                }
            }
            console.log("Platform credentials saved successfully!");
        } catch (error) {
            console.error("Error saving platform credentials:", error.message);
        }
    
        // Fetch platform data (LeetCode, Codeforces, etc.)
        await getCodeForcesUser();
        await getUserContests();
        await fetchUserSubmissions();
        await getLeetCodeUser();
        await getCodeChefUser();
    
        navigate("/");  // Navigate to a different page after submission
    };
    
    

    return (
        <div className="LinksPage-form h-[90vh] w-full bg-[#181818] flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="form-LinksPage h-[100%] w-[50%] bg-[#181818] flex flex-col justify-center items-center"
            >
                <h1 className="link-text text-white font-bold text-[2vw]">
                    Link your accounts
                </h1>
                <div className="input-boxes h-[50%] w-full flex flex-col justify-evenly items-center">
                    <input
                        onChange={addChange}
                        value={ulinks.leetcode}
                        className="text-white outline-none w-[80%] px-[2vw] py-[1.5vh] bg-zinc-800"
                        id="leetcode"
                        name="leetcode"
                        type="text"
                        placeholder="Leetcode Username"
                    />
                    <input
                        onChange={addChange}
                        value={ulinks.codeforces}
                        className="text-white outline-none w-[80%] px-[2vw] py-[1.5vh] bg-zinc-800"
                        id="codeforces"
                        name="codeforces"
                        type="text"
                        placeholder="CodeForces Username"
                    />
                    <input
                        onChange={addChange}
                        value={ulinks.codechef}
                        className="text-white outline-none w-[80%] px-[2vw] py-[1.5vh] bg-zinc-800"
                        id="codechef"
                        name="codechef"
                        type="text"
                        placeholder="CodeChef Username"
                    />
                    
                </div>
                <button
                    type="submit"
                    className="w-[20%] px-[2vw] py-[1vh] bg-white border-[1px] border-solid border-white hover:bg-transparent hover:text-white font-bold"
                >
                    Done
                </button>
            </form>
        </div>
    );
};

export default LinksPage;
