// Ethan Cullen
import ListView from "../components/ListView";
import Carousel from "../components/Carousel";
import Filter from "../components/Filter";
import { AiOutlineLaptop } from "react-icons/ai"
import { FaGamepad, FaHeadset, FaRegKeyboard, FaMouse } from "react-icons/fa"
import { FiCpu, FiMonitor } from "react-icons/fi"
import { ImPowerCord } from "react-icons/im"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
    <div ><Carousel/>
    <div className="w-[90%] mx-auto my-6 flex flex-1 -z-50 ">
   
        <div className=" flex mx-auto mt-5 gap-2 max-w-full overflow-x-auto ">
          
          <div className="h-20 w-40 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100">
            <AiOutlineLaptop
              className="hover:animate-bounce  ml-16 mt-4" />
            Laptops
          </div>
          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100">         <FaGamepad
              className="hover:animate-bounce  ml-16 mt-4" />
            Consoles
          </div>

          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><FaHeadset
              className="hover:animate-bounce  ml-16 mt-4" />
            Headsets
          </div>

          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><FiCpu
              className="hover:animate-bounce  ml-16 mt-4" />
           CPU
          </div>

          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><FaRegKeyboard
              className="hover:animate-bounce  ml-16 mt-4" />
            Keyboard
          </div>

        
          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><FiMonitor
              className="hover:animate-bounce  ml-16 mt-4" />
            Monitor
          </div>
          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><FaMouse
              className="hover:animate-bounce  ml-16 mt-4" />
            Mice
          </div>
          <div className="h-20 w-40 p-2 text-xl  bg-gradient-1   rounded text-center shadow-xl hover:animate-bounce opacity-50 hover:opacity-100"><ImPowerCord
              className="hover:animate-bounce  ml-16 mt-4" />
            PowerSupplies
          </div>

        </div>
      </div>
    
      <ListView />
      
    </div>
    </div>
  );
}
