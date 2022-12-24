// Ethan Cullen

import { Link } from "react-router-dom";
import Button from "./ui/Button";

export default function Carousel() {
  return (
    <div className="   pt-12 w-full min-h-20% bg-[#424867] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Sell Your Gear</h1>
      <p className="w-1/2 ">
      </p>
      <Button className=" mt-12 mb-4 w-[25%] bg-primary text-black transition ease-in "><Link to='/create-listing'>New Listing</Link>
      </Button>
    </div>
  );
}
