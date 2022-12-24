// Ethan Cullen
import { AiOutlineLaptop } from "react-icons/ai";
import { FaGamepad, FaHeadset, FaMouse, FaRegKeyboard } from "react-icons/fa";
import { FiCpu, FiMonitor } from "react-icons/fi";
import { ImPowerCord } from "react-icons/im";
import Carousel from "../components/Carousel";
import ListView from "../components/ListView";

export function Home() {
  return (
    <div className="overflow-x-hidden">
      <div ><Carousel />
        <div className="w-[90%] mx-auto my-6 flex flex-1 -z-50 ">

          <div className="flex max-w-full gap-2 mx-auto mt-5 overflow-x-auto ">

            <div className="w-40 h-20 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100">
              <AiOutlineLaptop
                className="mt-4 ml-16 hover:animate-bounce" />
              Laptops
            </div>
            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100">         <FaGamepad
              className="mt-4 ml-16 hover:animate-bounce" />
              Consoles
            </div>

            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><FaHeadset
              className="mt-4 ml-16 hover:animate-bounce" />
              Headsets
            </div>

            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><FiCpu
              className="mt-4 ml-16 hover:animate-bounce" />
              CPU
            </div>

            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><FaRegKeyboard
              className="mt-4 ml-16 hover:animate-bounce" />
              Keyboard
            </div>


            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><FiMonitor
              className="mt-4 ml-16 hover:animate-bounce" />
              Monitor
            </div>
            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><FaMouse
              className="mt-4 ml-16 hover:animate-bounce" />
              Mice
            </div>
            <div className="w-40 h-20 p-2 text-xl text-center rounded shadow-xl opacity-50 bg-gradient-1 hover:animate-bounce hover:opacity-100"><ImPowerCord
              className="mt-4 ml-16 hover:animate-bounce" />
              PowerSupplies
            </div>

          </div>
        </div>

        <ListView />

      </div>
    </div>
  );
}
