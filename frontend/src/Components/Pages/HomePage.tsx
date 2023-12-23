
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-[#55CDFC] flex justify-center items-center min-h-screen text-black">
      <div className="flex flex-col items-center px-8 text-center">
        <p className="text-gray-800 text-4xl leading-[60px]">
          "Reimagine Interviews: <br /> Ascend with AI—Your Achievement, <br /> Our Innovation."
        </p>
        <button
          className="mt-8 px-6 py-3 text-lg bg-[#FFD700] hover:bg-[#FFAC33] rounded-full focus:outline-none transition duration-300"
          onClick={handleClick}
        >
          Take a free trial
        </button>
      </div>

      <div className="flex justify-center items-center w-[50%]">
        <img
          className="rounded-lg shadow-lg"
          src="https://www.globaltimes.cn/Portals/0/attachment/2022/2022-05-27/04143cc7-2bd0-4e3a-bec3-1a250f689a86.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
