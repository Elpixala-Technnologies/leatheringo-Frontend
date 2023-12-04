import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";


const RootLayout = ({ children }) => {
    return (
        <main>
            <Navbar />
           <div
            className="border-b border-[#000]"
           ></div>
            <BottomNav />
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