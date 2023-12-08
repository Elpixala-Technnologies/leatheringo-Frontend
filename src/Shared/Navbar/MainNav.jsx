import { MainLogo, WhiteBgLogo } from "@/src/Assets";
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
import useProducts from "@/src/Hooks/useProducts";



const MainNav = ({ isTransparent }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { productData } = useProducts();
  const [profileToggle, setProfileToggle] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");

  const [searchBarToggle, setSearchBarToggle] = useState(false);

  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setSticky(true);
        setShowLogo(false);
      } else {
        setSticky(false);
        setShowLogo(true);
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
    shose: false
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
      if (offset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // acordion
  const [aOn, setAON] = useState(false);
  const [aOn2, setAON2] = useState(false);

  // =============

  const isAnyMegaMenuOpen = Object.values(megaMenuVisible).some(value => value);

  // Conditional class for the navbar
  const navbarClass = isAnyMegaMenuOpen ? 'bg-white text-black shadow' : isTransparent && !isSticky ? 'bg-transparent text-[#fff]' : 'bg-white text-black shadow';

  const textColorClass = isAnyMegaMenuOpen ? 'text-black' : isTransparent && !isSticky ? 'text-[#fff]' : 'text-black';

  const isNavbarTransparent = isTransparent && !isSticky && !isAnyMegaMenuOpen;
  const navbarHeight = isSticky ? '60px' : '80px'; 

  return (
    <div>
      <header
        className={`${navbarClass} fixed top-0 w-full z-50 transition duration-200`}
        style={{ zIndex: "9999" , fontSize: "10px"}}
      >
        <nav
          className={`flex items-center ${textColorClass} md:container relative md:px-4 px-2`}
        >
          <div className="flex items-center mx-2 justify-between w-full md:mx-auto ">
            <div className="flex items-center gap-2">
              <div className="flex  md:gap-4 gap-2 md:hidden">
                <button
                  className={` block md:hidden p-2 `}
                  onClick={() => setOpen(!open)}>
                  <AiOutlineMenu className={`${textColorClass} text-[1.5rem]`} />
                </button>
              </div>
              <div className={`${isSticky ? 'text-white' : 'text-black'} md:block hidden `}>
                <Link className="font-bold text-black gap-1 flex items-center" href="/">
                  <FaMapMarkerAlt className={`${textColorClass} text-[1.6rem]`} /> <span className={`${textColorClass} text-[0.8rem]`}>IND</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center flex-col justify-center">
              <div>
                <div className="md:hidden block">
                  <Link className="text-xl font-bold text-black" href="/">
                    <Image
                      src={isNavbarTransparent ? WhiteBgLogo : MainLogo}
                      alt="logo"
                      width={130}
                      height={80}
                      className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform mt-4"
                    />
                  </Link>
                </div>

                <div className="md:block hidden">
                  {
                    showLogo && (
                      <div>
                        <Link className="text-xl font-bold text-black" href="/">
                          <Image
                            src={isNavbarTransparent ? WhiteBgLogo : MainLogo}
                            alt="logo"
                            width={130}
                            height={80}
                            className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform mt-4"
                          />
                        </Link>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="manu-items md:flex  gap-4 justify-center items-center hidden ">
                <ul className={` flex gap-8 justify-center items-center  px-8 py-2 rounded-full`}>
                  <li>
                    <div onMouseEnter={() => toggleMegaMenu("shose")}>
                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                          <span className={`${textColorClass} `}> Shoes{" "}</span>
                          <FaAngleDown className={`${textColorClass} text-[1.5rem]`} />
                        </button>
                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                      </div>
                      {megaMenuVisible?.shose && (
                        <div
                          className={`text-black bg-white container mx-auto mega-menu border z-50 absolute top-[100%] rounded py-2 px-2 opacity-100 h-[100vh] left-0 right-0`}
                          onMouseLeave={() => toggleMegaMenu("shose")}
                          onMouseEnter={() => toggleMegaMenu("shose")}
                        >
                          <ul className="border-t relative">
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="flex gap-2 ">
                                  <div className="h-full  px-2 ">
                                    <h1 className="text-[1.3rem] font-bold px-4 mt-2">Trending</h1>
                                    <div className="flex flex-col px-4">
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Formal")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Formal
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Sneakers")}`}
                                            className="text-[1.2rem] my-1"
                                          >
                                            Sneakers
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Casual")}`}
                                            className="text-[1.2rem] my-1"
                                          >
                                            Casual
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Brogues")}`}
                                            className="text-[1.2rem] my-1"
                                          >
                                            Brogues
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="h-full  px-2">
                                    <h1 className="text-[1.4rem] font-bold px-4 mt-2">New Arrival</h1>
                                    <div className="flex flex-col px-4">
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Chelsea Boots")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Chelsea Boots
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>

                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Derbies")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Derbies
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>

                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Whole Cut Shoes")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Whole Cut Shoes
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="h-full px-2">
                                    <h1 className="text-[1.4rem] font-bold px-4 mt-2">Popular</h1>
                                    <div className="flex flex-col px-4">
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Single Monk")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Single Monk
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                      <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                                        <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                                          <Link
                                            href={`/product?categoryName=${encodeURIComponent("Double Monk")}`}
                                            className="text-[1.2rem] my-2"
                                          >
                                            Double Monk
                                          </Link>
                                        </button>
                                        <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-5 absolute top-0">
                                  {
                                    productData && productData.slice(0, 2).map((product) => {
                                      return (
                                        <div className="w-[18rem] mt-2">
                                          <div>
                                            <Link href={`/product/${product?._id}`}>
                                              <div className="productImage">
                                                <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
                                                  <img
                                                    src={product?.colors[0]?.images[0]}
                                                    alt="First Image"
                                                    className="h-[80%] w-[80%] object-cover duration-200"
                                                  />
                                                  <img
                                                    src={product?.colors[0]?.images[1]}
                                                    alt="Second Image"
                                                    className="hover-img absolute top-0 left-0 w-[80%] h-[80%] object-cover duration-300"
                                                  />
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                          <Link href={`/product?id=${product.id}`} className="text-[1.2rem] my-4">
                                            {product.name}
                                          </Link>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>



                  <li className={`${textColorClass} hover:font-semibold hover:underline`}>
                    <Link
                      href={`/product?categoryName=${encodeURIComponent("Bags")}`}
                      className={` ${selectedMenu === "Products" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Products")}
                    >
                      Bags
                    </Link>
                  </li>

                  <li className={`${textColorClass} hover:font-semibold hover:underline`}>
                    <Link
                      href={`/product?categoryName=${encodeURIComponent("Belts")}`}
                      className={` ${selectedMenu === "Hot Deals" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Hot Deals")}
                    >
                      Belts
                    </Link>
                  </li>
                  <li className={`${textColorClass} hover:font-semibold hover:underline`}>
                    <Link
                      href={`/product?categoryName=${encodeURIComponent("Card Holders")}`}
                      className={` ${selectedMenu === "Blogs" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Blogs")}
                    >
                      Card Holders
                    </Link>
                  </li>
                  <li className={`${textColorClass} hover:font-semibold hover:underline`}>
                    <Link
                      href={`/product?categoryName=${encodeURIComponent("Wallets")}`}
                      className={` ${selectedMenu === "Blogs" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Blogs")}
                    >
                      Wallets
                    </Link>
                  </li>
                  <li
                    className={`${textColorClass} hover:font-semibold hover:underline`}
                  >
                    <Link
                      href="/product"
                      className={` ${selectedMenu === "Blogs" ? "selected-manu" : ""
                        }`}
                      onClick={() => setSelectedMenu("Blogs")}
                    >
                      Product
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
                  <CiUser className={`${textColorClass} text-[1.5rem]`} />
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
                              className="flex items-center  gap-2 border-common-btn "
                            >
                              <FaUserAlt /> SignIn
                            </Link>
                          </>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {isAdmin && (
                              <Link
                                href="/dashboard"
                                className="flex items-center  gap-2 border-common-btn "
                              >
                                <FaMicrosoft /> Dashboard
                              </Link>
                            )}
                            {userEmail && !isAdmin && (
                              <Link
                                href="/userdashboard"
                                className="flex items-center  gap-2 border-common-btn "
                              >
                                <FaUserAlt /> Profile
                              </Link>
                            )}
                            <button
                              className="flex items-center gap-2 my-2 border-common-btn "
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
                  <BsCartPlus
                    className={`${textColorClass} text-[1.5rem]`}
                  />
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

                }} className="">
                  <div className="w-full flex justify-between items-center"><Link href="/">Shose</Link> <span className="text-xl">{aOn ? <>-</> : <>+</>}</span> </div>
                  <div className={`${aOn ? 'h-[70vh] p-4 overflow-y-scroll mt-3' : 'h-[0px] '} rounded-lg bg-[#243c72]  duration-300 overflow-hidden`}>
                    <ul className="border-t">
                      <div className="flex flex-col  gap-4">
                        <div>
                          <div className="flex gap-2 flex-col">
                            <div className="h-full  px-2 ">
                              <h1 className="text-[1.3rem] font-bold px-4 mt-2">Trending</h1>
                              <div className="flex flex-col px-4">
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Formal")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Formal
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Sneakers")}`}
                                  className="text-[1.2rem] my-1"
                                >
                                  Sneakers
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Casual")}`}
                                  className="text-[1.2rem] my-1"
                                >
                                  Casual
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Brogues")}`}
                                  className="text-[1.2rem] my-1"
                                >
                                  Brogues
                                </Link>
                              </div>
                            </div>

                            <div className="h-full  px-2">
                              <h1 className="text-[1.4rem] font-bold px-4 mt-2">New Arrival</h1>
                              <div className="flex flex-col px-4">
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Chelsea Boots")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Chelsea Boots
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Derbies")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Derbies
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Whole Cut Shoes")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Whole Cut Shoes
                                </Link>
                              </div>
                            </div>

                            <div className="h-full px-2">
                              <h1 className="text-[1.4rem] font-bold px-4 mt-2">Popular</h1>
                              <div className="flex flex-col px-4">
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Single Monk")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Single Monk
                                </Link>
                                <Link
                                  href={`/product?categoryName=${encodeURIComponent("Double Monk")}`}
                                  className="text-[1.2rem] my-2"
                                >
                                  Double Monk
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col items-center gap-5 ">
                            {
                              productData && productData.slice(0, 2).map((product) => {
                                return (
                                  <div className="w-full mt-2">
                                    <div>
                                      <Link href={`/product/${product?._id}`}>
                                        <div className="productImage">
                                          <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
                                            <img
                                              src={product?.colors[0]?.images[0]}
                                              alt="First Image"
                                              className="h-full w-full object-cover duration-200"
                                            />
                                            <img
                                              src={product?.colors[0]?.images[1]}
                                              alt="Second Image"
                                              className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                            />
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                    <Link href={`/product?id=${product.id}`} className="text-[1.2rem] my-4">
                                      {product.name}
                                    </Link>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </li>


                <li onClick={() => setOpen(!open)} className="">
                  <Link href="/">Home</Link>
                </li>
                <li onClick={() => setOpen(!open)} className="">
                  <Link
                    href={`/product?categoryName=${encodeURIComponent("Bags")}`}
                    className={` ${selectedMenu === "Bags" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Bags")}
                  >
                    Bags
                  </Link>
                </li>

                <li onClick={() => setOpen(!open)} className="">
                  <Link
                    href={`/product?categoryName=${encodeURIComponent("Belts")}`}
                    className={` ${selectedMenu === "Belts" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Belts")}
                  >
                    Belts
                  </Link>
                </li>
                <li onClick={() => setOpen(!open)} className="">
                  <Link
                    href={`/product?categoryName=${encodeURIComponent("Card Holders")}`}
                    className={` ${selectedMenu === "Card Holders" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Card Holders")}
                  >
                    Card Holders
                  </Link>
                </li>
                <li onClick={() => setOpen(!open)} className="">
                  <Link
                    href={`/product?categoryName=${encodeURIComponent("Wallets")}`}
                    className={` ${selectedMenu === "Wallets" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Wallets")}
                  >
                    Wallets
                  </Link>
                </li>
                <li onClick={() => setOpen(!open)} className="">
                  <Link
                    href="/product"
                    className={` ${selectedMenu === "Product" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Product")}
                  >
                    Product
                  </Link>
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
