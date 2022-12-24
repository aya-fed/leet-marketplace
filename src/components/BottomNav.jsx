//Ethan Cullen
import { AiFillBell, AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import WishlistIcon from "./ui/WishlistIcon";

export function BottomNav() {
  return (
    <nav className="nav bg-[#252A41] h-[10%]  rounded-t-xl fixed bottom-0  pt-4  lg:hidden z-50">
      <div className="flex" >
        <div className="">
          <ul className="flex w-screen justify-evenly">
            <Link to="/" className="Home"><AiFillHome />
            </Link>

            <CustomLink to="/search/:keywords" ><HiMagnifyingGlass /></CustomLink>
            <CustomLink to="/wishlist"><WishlistIcon /></CustomLink>
            <CustomLink to="/user-profile/:userId"><FaUser /></CustomLink>
            <CustomLink to="/my-listings"><AiFillBell /></CustomLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <div  >
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    </div>
  )
}