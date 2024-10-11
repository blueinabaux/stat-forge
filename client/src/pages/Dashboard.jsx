import axios from "axios";
import { useSelector } from "react-redux";
import StickyHeadTable from "../components/Tables/StickyHeadTable";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user || {});
  console.log("CURRENT USER: ", user);

  const { problems } = useSelector((state) => state.problems);
  console.log("All Problems: ", problems);

  const {
    user: leetCodeUser,
    solvedProblems: leetCodeSolved,
    recentSubmissions,
    submissionCalendar,
  } = useSelector((state) => state.leetCode || {});
  console.log("LeetCode USER: ", leetCodeUser);

  // Assuming `codeChefData` contains relevant CodeChef data (like rating, rank, contests, etc.)
  const {
    user: codeChefUser,
    stars: codeChefStars,
    rank: codeChefRank,
    rating: codeChefRating,
  } = useSelector((state) => state.codeChef || {});

  // name,
  // stars,
  // currentRating,
  // countryRank,
  console.log("CodeChef USER: ", codeChefUser);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.toISOString().split("T")[0]; // Get the date part in YYYY-MM-DD format
  };

  const [heatmapData, setHeatmapData] = useState([]);

  // Fetching data for the heatmap
  useEffect(() => {
    if (submissionCalendar) {
      const formattedData = Object.entries(submissionCalendar).map(
        ([timestamp, count]) => ({
          date: formatDate(parseInt(timestamp)),
          count: count,
        })
      );
      console.log("Formatted Heatmap Data:", formattedData);
      setHeatmapData(formattedData); // Set the formatted data for heatmap
    }
  }, [submissionCalendar]);

  if (!leetCodeUser) {
    return <div>Loading or No LeetCode Data</div>;
  }

  const solvedProblems = Array.isArray(problems)
    ? problems.filter((p) => p.solved).length
    : 0;

  if (!user || Object.keys(user).length === 0) {
    return <div>Loading or No User Data</div>;
  }

  const tabs = [
    {
      id: 1,
      tabName: "LEETCODE",
    },
    {
      id: 2,
      tabName: "CODEFORCES",
    },
    {
      id: 3,
      tabName: "CODECHEF", // Add the CodeChef tab
    },
  ];
  const [activeTab, setActiveTab] = useState(1);

  const tabClick = (tabNum) => {
    setActiveTab(tabNum);
  };

  return (
    <>
      <div className="mininav bg--500  h-[10vh] flex gap-[2vw] justify-start max-md:justify-center items-center">
        {tabs.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => tabClick(item.id)}
              className={`tab-main max-md:text-[1.5vh]  max-md:px-[9vw] max-md:py-[1.5vh] px-[3vw] py-[1.2vh] text-[1vw] transition-all duration-300 ${
                activeTab === item.id
                  ? " text-white bg-[#6E88B6]"
                  : "bg-zinc-700 text-white"
              }`}
            >
              {item.tabName}
            </button>
          );
        })}
      </div>

      <div className="scroll-div h-[80vh] max-md:h-[40vh] flex flex-col justify-start gap-[2vh] items-center bg--500  text-white w-full  bg--800 px-[0vw]  ">
        {activeTab === 1 ? (
          <div className="dash-main h-[90vh] w-full bg--700 flex  justify-center items-center ">
            <div className="left-dash h-[100%] w-[25%] flex justify-center bg--400 items-center ">
              <div className="top-left-dash h-full w-[100%] bg--700 flex flex-col justify-around items-center ">
                <div className="rating-card h-[25%] w-[93%] bg-[#6E88B6] flex flex-col justify-around items-start px-[2vw] ">
                  <h1 className="text-white">LeetCode Ranking</h1>
                  <h1 className="text-white text-[4vw]">
                    {leetCodeUser.ranking}
                  </h1>
                </div>
                <div className="rating-card h-[25%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                  <h1 className="text-white">Total Solved Problems</h1>
                  <h1 className="text-white text-[4vw]">{leetCodeSolved}</h1>
                </div>
              </div>
            </div>
            <div className="bottom-dash h-[100%] w-[75%] flex justify-center bg--400 items-center ">
              <div className="bottom-left-dash h-full w-[30%] bg--700 flex flex-col justify-around items-center ">
                <div className="rating-card h-[45%] w-[93%] bg-[#24242E] flex justify-center items-center">
                  <div
                    className="flex justify-center items-center bg--500"
                    style={{ width: 220, height: 220 }}
                  >
                    <CircularProgressbar
                      value={leetCodeSolved}
                      text={`${leetCodeSolved}`}
                      strokeWidth={12}
                      styles={buildStyles({
                        pathColor: `#6E88B6`,
                        textColor: "#6E88B6",
                        trailColor: "#30303e",
                        backgroundColor: "#3e98c7",
                        textSize: "16px",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="bottom-right-dash h-full w-[70%] bg--700 flex flex-col justify-evenly items-center ">
                <div className="rating-card h-[95%] w-[97%] bg-[#24242E]">
                  <CalendarHeatmap
                    startDate={new Date("2024-01-01")}
                    endDate={new Date("2024-12-31")}
                    values={heatmapData}
                    classForValue={(value) => {
                      if (!value) return "bg-green-200";
                      return `heatmap-level-${Math.min(value.count, 4)}`;
                    }}
                    tooltipDataAttrs={(value) => ({
                      "data-tip": value.date
                        ? `${value.date}: ${value.count} submissions`
                        : "No submissions",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 2 ? (
          <div className="dash-main h-[80vh] w-full bg--700 flex  justify-center items-center ">
            <div className="left-dash h-[100%] w-[25%] flex justify-center bg--400 items-center ">
              <div className="top-left-dash h-full w-[100%] bg--700 flex flex-col justify-around items-center ">
                <div className="rating-card h-[25%] w-[93%] bg-[#6E88B6] flex flex-col justify-around items-start px-[2vw] ">
                  <h1 className="text-white">RATING</h1>
                  <h1 className="text-white text-[4vw]">{user.rating}</h1>
                </div>
                <div className="rating-card h-[25%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                  <h1 className="text-white">RANK</h1>
                  <h1 className="text-white text-[4vw]">{user.rank}</h1>
                </div>
                <div className="rating-card h-[40%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                  <h1 className="text-white">CONTESTS</h1>
                  <h1 className="text-white text-[1vw] px-[0.5vw] py-[1vh] bg-[#6E88B6]">Codeforces Round 922 (Div. 2)</h1>
                  <h1 className="text-white text-[1vw] px-[0.5vw] py-[1vh] bg-[#6E88B6]">Codeforces Round 924 (Div. 2)</h1>
                  <h1 className="text-white text-[1vw] px-[0.5vw] py-[1vh] bg-[#6E88B6]">Codeforces Round 926  (Div. 2)</h1>
                </div>
              </div>
            </div>
            <div className="bottom-dash h-[100%] w-[75%] flex justify-center bg--400 items-center ">
              <div className="bottom-left-dash h-full w-[30%] bg--700 flex flex-col justify-around items-center ">
                <div
                  className="rating-card h-[45%] w-[93%] bg-[#24242E] flex justify-center items-center"
                  style={{ width: 220, height: 220 }}
                >
                  <CircularProgressbar
                    value={solvedProblems}
                    text={`${solvedProblems}`}
                    strokeWidth={12}
                    styles={buildStyles({
                      pathColor: `#6E88B6`,
                      textColor: "#6E88B6",
                      trailColor: "#30303e",
                      backgroundColor: "#3e98c7",
                      textSize: "16px",
                    })}
                  />
                </div>
              </div>
              <div className="bottom-right-dash h-full w-[70%] bg--700 flex flex-col justify-evenly items-center ">
                <StickyHeadTable />
              </div>
            </div>
          </div>
        ) : activeTab === 3 ? (
          <div className="dash-main h-[80vh] w-full bg--700 flex justify-center items-center ">
            {/* Content for CodeChef tab */}
            <div className="left-dash h-[100%] w-[25%] flex justify-center bg--400 items-center ">
              <div className="top-left-dash h-full w-[100%] bg--700 flex flex-col justify-around items-center ">
                <div className="rating-card h-[30%] w-[93%] bg-[#6E88B6] flex flex-col justify-around items-start px-[2vw] ">
                  <h1 className="text-white">CodeChef Rating</h1>
                  <h1 className="text-white text-[4vw]">{codeChefRating}</h1>
                </div>
                <div className="rating-card h-[30%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                  <h1 className="text-white">CodeChef Rank</h1>
                  <h1 className="text-white text-[4vw]">{codeChefRank}</h1>
                </div>
                <div className="rating-card h-[30%] w-[93%] bg-[#24242E] flex flex-col justify-around items-start px-[2vw]">
                  <h1 className="text-white">CodeChef Stars</h1>
                  <h1 className="text-white text-[4vw]">{codeChefStars}</h1>
                </div>

              </div>
            </div>
            <div className="bottom-dash h-[100%] w-[75%] flex justify-center bg--400 items-center ">
              <div className="bottom-left-dash h-full w-[30%] bg--700 flex flex-col justify-around items-center ">
                <div
                  className="rating-card h-[45%] w-[93%] bg-[#24242E] flex justify-center items-center"
                  style={{ width: 220, height: 220 }}
                >
                  <CircularProgressbar
                    value={codeChefRating}
                    text={`${codeChefRating}`}
                    strokeWidth={12}
                    styles={buildStyles({
                      pathColor: `#6E88B6`,
                      textColor: "#6E88B6",
                      trailColor: "#30303e",
                      backgroundColor: "#3e98c7",
                      textSize: "16px",
                    })}
                  />
                </div>
              </div>
              <div className="bottom-right-dash h-full w-[70%] bg--700 flex flex-col justify-evenly items-center ">
                {/* Add content to display CodeChef contests or other stats */}
                <div className="rating-card h-[95%] w-[97%] bg-[#24242E] p-[4vh]">
                  <h2 className="text-white text-lg">Heat Map</h2>

                  <iframe className="w-full h-[50vh]" src={`https://codechef-api.vercel.app/heatmap/${codeChefUser}`}></iframe>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
