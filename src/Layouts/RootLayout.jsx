// import Navbar from "../Shared/Navbar/Navbar";
// import BottomNav from "../Shared/Navbar/BottomNav";
// import Footer from "../Shared/Footer/Footer";
// import MainNav from "../Shared/Navbar/MainNav";


// const RootLayout = ({ children }) => {
//     return (
//         <main>
//             <MainNav />
//             <section className="mb-4">
//                 {children}
//             </section>
//             <div>
//                 <Footer />
//             </div>
//         </main>
//     );
// };

// export default RootLayout;

// Import the necessary components\
import { useRouter } from 'next/router';
import Footer from "../Shared/Footer/Footer";
import MainNav from "../Shared/Navbar/MainNav";

const RootLayout = ({ children }) => {
    const router = useRouter();
    const isHomePage = router.pathname === '/';

    return (
        <main>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
                    <MainNav isTransparent={isHomePage} />
                </div>
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default RootLayout;
