import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";
import MainNav from "../Shared/Navbar/MainNav";


const RootLayout = ({ children }) => {
    return (
        <main>
            <MainNav />
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

// // Import the necessary components
// import Navbar from "../Shared/Navbar/Navbar";
// import BottomNav from "../Shared/Navbar/BottomNav";
// import Footer from "../Shared/Footer/Footer";
// import MainNav from "../Shared/Navbar/MainNav";

// const RootLayout = ({ children }) => {
//     return (
//         <main>
//             {/* Make the Navbar transparent and position it on top */}
//             <div style={{ position: 'relative' }}>
//                 <div style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
//                     <MainNav transparent />
//                 </div>
//                 {children}
//             </div>
//             <Footer />
//         </main>
//     );
// };

// export default RootLayout;
