import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";
import MainNav from "../Shared/Navbar/MainNav";


const RootLayout = ({ children }) => {
    return (
        <main>
            {/* <Navbar /> */}
           <div
            className="border-b border-[#000]"
           ></div>
            {/* <BottomNav /> */}
            <MainNav/>
            <section className="mb-4">
                {children}
            </section>
            <div>
                <Footer />
            </div>
        </main>
    );
};

export default RootLayout;