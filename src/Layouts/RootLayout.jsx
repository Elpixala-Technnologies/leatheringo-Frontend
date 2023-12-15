
// import { useRouter } from 'next/router';
// import Footer from "../Shared/Footer/Footer";
// import MainNav from "../Shared/Navbar/MainNav";

// const RootLayout = ({ children }) => {
//     const router = useRouter();
//     const isHomePage = router.pathname === '/';

//     return (
//         <main>
//             <div style={{ position: 'relative' }}>
//                 <div style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
//                     <MainNav isTransparent={isHomePage} />
//                 </div>
//                 <div>
//                     {children}
//                 </div>
//             </div>
//             <Footer />
//         </main>
//     );
// };

// export default RootLayout;

import { useRouter } from 'next/router';
import Footer from "../Shared/Footer/Footer";
import MainNav from "../Shared/Navbar/MainNav";

const RootLayout = ({ children }) => {
    const router = useRouter();
    const isHomePage = router.pathname === '/';

    return (
        <main>
            <div style={{ position: isHomePage ? 'relative' : 'static' }}>
                <MainNav isTransparent={isHomePage} style={{
                    position: isHomePage ? 'absolute' : 'relative',
                    width: '100%',
                    zIndex: 10
                }} />
                <div>
                    {children}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default RootLayout;
