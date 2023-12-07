import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import {
  FaMicrosoft,
  FaPowerOff,
  FaUserAlt,
  FaAngleDown,
} from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";



const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  //   const { categoryMainData} = useProducts();
  const [profileToggle, setProfileToggle] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [searchPlaceholderText, setSearchPlaceholderText] = useState('Search');
  const [placeholderText, setPlaceholderText] = useState("");

  const [searchBarToggle, setSearchBarToggle] = useState(false);

  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setSticky(true);
        setShowLogo(false); // Hide logo when scrolled beyond 100px
      } else {
        setSticky(false);
        setShowLogo(true); // Show logo when scrolled back to top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Text to display in the placeholder
  const searchText = "Search for products, shops...";

  // Animation speed (adjust as needed)
  const animationSpeed = 300; // in milliseconds


  useEffect(() => {
    let currentIndex = 0;
    let intervalId;

    // Function to update the placeholder text with typing animation
    function updatePlaceholder() {
      setPlaceholderText(searchText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > searchText.length) {
        currentIndex = 0;
      }
    }

    // Start the animation
    intervalId = setInterval(updatePlaceholder, animationSpeed);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [megaMenuVisible, setMegaMenuVisible] = useState({
    categorys: false,
    carsmanu: false
  });


  // Function to toggle mega menu visibility
  const toggleMegaMenu = (menu) => {
    setMegaMenuVisible((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const openProfile = () => {
    setProfileToggle(true);
  };

  const handelProfileToggle = () => {
    setProfileToggle(!profileToggle); // Toggle the profile state
  };

  const handelSearchBarToggle = () => {
    setSearchBarToggle(!searchBarToggle); // Toggle the search bar state
  };

  const [isSticky, setSticky] = useState(false);

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) { // Adjust the offset value according to when you want the navbar to become sticky
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // acordion
  const [aOn, setAON] = useState(false);
  const [aOn2, setAON2] = useState(false);

  return (
    <div>

      <header
        className={`${isSticky ? ' bg-[white] fixed top-0 duration-200' : 'md:bg-[white] bg-[transparent] duration-200 relative'} duration-200 w-full shadow z-50 mx-auto`}
        style={{
          zIndex: "9999",
        }}
      >
        <nav className="py-4 flex items-center text-black md:container relative  md:px-4 px-2">
          <div className="flex items-center mx-2 justify-between w-full md:mx-auto ">
            <div className="flex items-center gap-2">
              <div className="flex  md:gap-4 gap-2 md:hidden">
                <button
                  className={`${isSticky ? 'text-black' : 'text-black'} block md:hidden p-2 `}
                  onClick={() => setOpen(!open)}>
                  <AiOutlineMenu className="text-[1.5rem] " />
                </button>
              </div>
              <div className="md:block hidden">
                <Link className="font-bold text-black gap-1 flex items-center" href="/">
                  <FaMapMarkerAlt className="text-[1.6rem]" /> <span className="text-[0.8rem]">IND</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center flex-col justify-center">
              <div>

                <div className="md:hidden block">
                  <Link className="text-xl font-bold text-black" href="/">
                    <Image
                      src={MainLogo}
                      alt="logo"
                      width={130}
                      height={80}
                      className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform"
                    />
                  </Link>
                </div>

                <div className="md:block hidden">
                  {
                    showLogo && (
                      <div>
                        <Link className="text-xl font-bold text-black" href="/">
                          <Image
                            src={MainLogo}
                            alt="logo"
                            width={130}
                            height={80}
                            className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform"
                          />
                        </Link>
                      </div>
                    )
                  }
                </div>

              </div>
              <div className="manu-items md:flex  gap-4 justify-center items-center hidden ">
                <ul className={`${isSticky ? 'bg-white text-black' : 'bg-transparent text-black'} flex gap-8 justify-center items-center  px-8 py-2 rounded-full`}>
                  <li>
                    <div onMouseEnter={() => toggleMegaMenu("carsmanu")}>
                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                          Shoes{" "}
                          <FaAngleDown className="text-[1.2rem] text-[#18568C] " />
                        </button>
                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                      </div>
                      {megaMenuVisible?.carsmanu && (
                        <div
                          className={`${isSticky ? 'text-black bg-[white]' : 'text-black bg-[white]'} container mx-auto mega-menu border z-50 absolute top-[100%]  left-[0%] rounded py-2 px-2  opacity-100`}
                          onMouseLeave={() => toggleMegaMenu("carsmanu")}
                          onMouseEnter={() => toggleMegaMenu("carsmanu")}
                        >
                          <ul>
                            <div className="grid grid-cols-6 text-left mx-20  py-4 px-4 justify-center items-center gap-7">
                              {/* {carsInfo?.map((itm) => (
                            <Link href={`/category/3`}>
                              {" "}
                              <div className="flex hover:opacity-[.67] relative items-center justify-center gap-2 flex-row">
                                <Image
                                  src={itm?.image}
                                  alt="logo"
                                  width={50}
                                  height={40}
                                  className="cursor-pointer relative z-[1] hover:drop-shadow-2xl text-gray-800"
                                />
                                <h1 >{itm?.name}</h1>
                              </div>
                            </Link>
                          ))} */}
                            </div>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>



                  <li className="hover:font-semibold hover:underline">
                    <Link
                      href="/products"
                      className={`common-hover ${selectedMenu === "Products" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Products")}
                    >
                      Bags
                    </Link>
                  </li>

                  <li className="hover:font-semibold hover:underline">
                    <Link
                      href="/products"
                      className={`common-hover ${selectedMenu === "Hot Deals" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Hot Deals")}
                    >
                      Belts
                    </Link>
                  </li>
                  <li className="hover:font-semibold hover:underline">
                    <Link
                      href="/blogs"
                      className={`common-hover ${selectedMenu === "Blogs" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Blogs")}
                    >
                      Card Holders
                    </Link>
                  </li>
                  <li className="hover:font-semibold hover:underline">
                    <Link
                      href="/blogs"
                      className={`common-hover ${selectedMenu === "Blogs" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Blogs")}
                    >
                      Wallets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "0.2rem" }}
              className="flex  justify-center items-center"
            >
              <div
                className="cursor-pointer"
                onClick={() => handelProfileToggle()}
              >
                <h1 className="p-2 rounded-full ">
                  <CiUser className="text-[1.5rem] text-[#332828] " />
                </h1>
                <div>
                  {profileToggle && (
                    <div className="absolute right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                      <ul
                        className="space-y-3 dark:text-white"
                        style={{ zIndex: 9000 }}
                      >
                        {!userEmail ? (
                          <>
                            <Link
                              href="/auth/login"
                              className="flex items-center  gap-2 border-common-btn common-hover"
                            >
                              <FaUserAlt /> SignIn
                            </Link>
                          </>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {isAdmin && (
                              <Link
                                href="/dashboard"
                                className="flex items-center  gap-2 border-common-btn common-hover"
                              >
                                <FaMicrosoft /> Dashboard
                              </Link>
                            )}
                            {userEmail && !isAdmin && (
                              <Link
                                href="/userdashboard"
                                className="flex items-center  gap-2 border-common-btn common-hover"
                              >
                                <FaUserAlt /> Profile
                              </Link>
                            )}
                            <button
                              className="flex items-center gap-2 my-2 border-common-btn common-hover"
                              onClick={() => handleLogout()}
                            >
                              <FaPowerOff /> Logout
                            </button>
                          </div>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Link
                  href="/cart"
                  className="relative  p-2 rounded-full"
                >
                  <BsCartPlus className="text-[1.5rem] text-[#484343]" />
                </Link>
              </div>
            </div>
            {/* side bar for small device */}
            <div
              className={`${open ? "left-0 " : "left-[-250%]"
                } duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white `}
              style={{ zIndex: 1000 }}
            >
              <button className="float-right" onClick={() => setOpen(!open)}>
                <AiOutlineClose className="text-4xl px-2" />
              </button>

              <div className="flex items-center  bg-[white] p-1 rounded-md gap-2">
                <input
                  type="text"
                  className="w-full pl-2 text-black"
                  placeholder="Search"
                />
                <AiOutlineSearch className="text-black" />
              </div>
              <ul className="flex flex-col gap-6 mt-6">
                <li onClick={() => {
                  setAON(!aOn)
                  setAON2(false)

                }} className="common-hover">
                  <div className="w-full flex justify-between items-center"><Link href="/">Category</Link> <span className="text-xl">{aOn ? <>-</> : <>+</>}</span> </div>
                  <div className={`${aOn ? 'h-[300px] p-4 overflow-y-scroll mt-3' : 'h-[0px] '} rounded-lg bg-[#243c72]  duration-300 overflow-hidden`}>
                    {/* {
                          categoryMainData && categoryMainData?.map((item, index) => {
                            return (
                              <div onClick={() => setOpen(!open)} key={index} >
                                <Link href={`/category/${item?.name}`}
                                  className='cursor-pointer hover:scale-105  duration-300 transform'
                                >
                                  <h1 className="font-normal pb-4 text-white">
                                    {item?.name}
                                  </h1>
                                </Link>
                              </div>
                            )
                          })
                        } */}
                  </div>
                </li>

                <li onClick={() => {
                  setAON(false)
                  setAON2(!aOn2)
                }} className="common-hover">
                  <div className="w-full flex justify-between items-center"><Link href="/">Shop By Car</Link> <span className="text-xl">{aOn ? <>-</> : <>+</>}</span> </div>
                  <div className={`${aOn2 ? 'h-[400px] p-4 overflow-y-scroll mt-3' : 'h-[0px] '} rounded-lg bg-[#243c72]   duration-300 overflow-hidden`}>
                    {/* <div className="grid grid-cols-3 gap-3">
                       {
                          carsInfo?.map((item, index) => {
                            return (
                              <div key={index} >
                                <Link href={`/category/${item?.name}`}
                                  className='cursor-pointer  hover:scale-105 flex justify-center flex-col gap-2 duration-300 transform'
                                >
                                  <Image className="w-[70px] h-[70px] m-auto" src={item?.image} width={90} height={90} alt="" />
                                  <h1 className="font-normal text-center pb-4 text-white">
                                    {item?.name}
                                  </h1>
                                </Link>
                              </div>
                            )
                          })
                        }
                    </div> */}
                  </div>
                </li>

                <li onClick={() => setOpen(!open)} className="common-hover">
                  <Link href="/">Home</Link>
                </li>
                <li onClick={() => setOpen(!open)} className="common-hover">
                  <Link href="/products">Products</Link>
                </li>
                <li onClick={() => setOpen(!open)} className="common-hover">
                  <Link href="/blogs">Blogs</Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default MainNav;
