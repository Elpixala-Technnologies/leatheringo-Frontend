import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import { Close, Search } from "@material-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMicrosoft, FaPowerOff, FaUserAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [onTab, setOnTab] = useState("bags");
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();

  return (
    <section className='bg-[#E3E6F3]'>
    <nav className=" md:px-4 border-b md:py-3 py-2 flex items-center text-black md:container ">
      <div className="md:container flex items-center mx-2 justify-between w-full md:mx-auto">
        <div className="md:flex md:items-center gap-4">
          <Link className="text-2xl font-bold text-black" href="/">
            <Image
              src={MainLogo}
              alt="logo"
              width={130}
              height={80}
              className="cursor-pointer hover:scale-105 duration-300 transform"
            />
          </Link>
        </div>

        <ul className="items-center hidden space-x-6 md:flex">
          <li className=" px-2 h-full ">
            <Link href="/">Home</Link>
          </li>
          <li className=" px-2 h-full ">
            <Link href="/product">Shop</Link>
          </li>
          <li className=" px-2 h-full ">
            <div className=" md:flex hidden border border-[#c4c4c4] items-center bg-[#281a1a00] p-1 rounded-md gap-2 common-hover">
              <input
                type="text"
                className="w-[220px] pl-2 py-1 text-black rounded"
                placeholder="Search"
              />
              <Search className="text-[#595959]" />
            </div>
          </li>
        </ul>

        <ul className="items-center hidden space-x-6 md:flex">
          {/* <li className=" px-2 h-full ">
            <Link href="/">Home</Link>
          </li>
          <li className=" px-2 h-full ">
            <Link href="/product">Shop</Link>
          </li> */}
          <li className=" px-2 h-full ">
            {!userEmail ? (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 border-common-btn common-hover"
                >
                  <FaUserAlt /> SignIn
                </Link>
              </>
            ) : (
              <div className="flex justify-center items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 border-common-btn common-hover"
                  >
                    <FaMicrosoft /> Dashboard
                  </Link>
                )}
                {userEmail && !isAdmin && (
                  <Link
                    href="/userdashboard"
                    className="flex items-center justify-center gap-2 border-common-btn common-hover"
                  >
                    <FaUserAlt /> Profile
                  </Link>
                )}
                <button
                  className="flex items-center justify-center gap-2 my-2 border-common-btn common-hover"
                  onClick={() => handleLogout()}
                >
                  <FaPowerOff /> Logout
                </button>
              </div>
            )}
          </li>
          <Link
            href="/cart"
            className="bg-[#9cb3dd43] w-[40px] rounded-full flex items-center justify-center h-[40px] common-hover"
          >
            <MdOutlineShoppingBag className="text-2xl text-[#335187]" />
          </Link>
        </ul>

        {/* shop and menu button group for small device */}
        <div className="flex  gap-4 md:hidden">
          <Link href="/cart">
            <div className="bg-[#9cb3dd43] w-[40px] rounded-full flex items-center justify-center h-[40px]">
              <MdOutlineShoppingBag className="text-2xl text-[#335187]" />
            </div>
          </Link>
          <button className="block md:hidden" onClick={() => setOpen(!open)}>
            <AiOutlineMenu className="text-3xl" />
          </button>
        </div>

        {/* side bar for small device */}
        <div
          className={`${
            open ? "left-0 " : "left-[-250%]"
          } duration-300 w-[100%] overflow-x-hidden fixed bg-[#172733] h-[100vh] top-0 p-4 text-white `}
          style={{ zIndex: 1000 }}
        >
          <button
            className="float-right absolute right-2 "
            onClick={() => setOpen(!open)}
          >
            <Close className="text-5xl" />
          </button>
          <br />
          <div className="flex items-center mt-3 justify-between border-b border-gray-700 ">
            <span
              onClick={() => setOnTab("shoes")}
              className={`${
                onTab == "shoes"
                  ? "border-b border-blue-400 text-blue-400"
                  : " border-[transparent] text-white"
              }   px-3 py-2`}
            >
              Shoes
            </span>
            <span
              onClick={() => setOnTab("bags")}
              className={`${
                onTab == "bags"
                  ? "border-b border-blue-400 text-blue-400"
                  : " border-[transparent] text-white"
              }   px-3 py-2`}
            >
              Bags
            </span>
          </div>
          <br />
          <ul className="grid grid-cols-3 mt-2 gap-1 overflow-hidden">
            <li
              style={{
                backgroundImage: `url("https://i.ibb.co/kVTpxmC/shoe3-65caee22.png")`,
                backgroundSize: "90% 90%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className=" rounded-lg h-[100px] border border-gray-500"
            ></li>
            <li
              style={{
                backgroundImage: `url("https://i.ibb.co/0VcBmHt/shoe1-5b3b6765.png")`,
                backgroundSize: "90% 90%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className=" rounded-lg h-[100px] border border-gray-500"
            ></li>
            <li
              style={{
                backgroundImage: `url("https://i.ibb.co/kVTpxmC/shoe3-65caee22.png")`,
                backgroundSize: "90% 90%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className=" rounded-lg h-[100px] border border-gray-500"
            ></li>
          </ul>{" "}
          <br />
          <ul className="flex flex-col gap-2">
            <li className="flex items-center border px-2 border-transparent hover:border-gray-600 duration-200 hover:bg-gray-700 py-3 rounded-md gap-2 ">
              <Link href="/">Home</Link>
            </li>
            <li className="flex items-center border px-2 border-transparent hover:border-gray-600 duration-200 hover:bg-gray-700 py-3 rounded-md gap-2 ">
              <Link href="/product">Shop</Link>
            </li>
            {/* <li className="common-hover">
              <Link href="/blog">Blog</Link>
            </li> */}
            <li className="flex mt-2 items-center border border-gray-600  p-1 rounded-md gap-2">
              <input
                type="text"
                className="w-full p-2 text-gray bg-transparent"
                placeholder="Search"
              />
              <Search className="text-gray" />
            </li>
            <li className="mt-4">
              {!userEmail ? (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center border border-gray-600 duration-200 hover:bg-gray-700 py-3 rounded-md gap-2 justify-center"
                  >
                    <FaUserAlt /> SignIn
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 border-common-btn "
                    >
                      <FaMicrosoft /> Dashboard
                    </Link>
                  )}

                  {userEmail && !isAdmin && (
                    <Link
                      href="/userdashboard"
                      className="flex items-center justify-center gap-2 border-common-btn common-hover"
                    >
                      <FaUserAlt /> Profile
                    </Link>
                  )}
                  <button
                    className="flex items-center justify-center w-full gap-2 my-2 border-common-btn"
                    onClick={() => handleLogout()}
                  >
                    <FaPowerOff /> Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    </section>
  );
};

export default Navbar;
