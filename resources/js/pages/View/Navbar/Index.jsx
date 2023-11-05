import React from "react";
import { useState, useRef, useEffect } from "react";

function Index({ auth }) {
    const [open, setOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [Menu, setMenu] = useState([
        { name: 'Home', link: '#' },
        { name: 'Divisi', link: '#divisi' },
        { name: 'About', link: '/' },
        { name: 'Contact', link: '/' },
       
    ]);

    // * Function
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    // * Effect
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);      
    console.log('navabr', auth);

    return (
        <>
            <nav className={`${scrollPosition > -1 ? 'bg-black border-b-[1px] border-white' : 'bg-transparent border-b-0'} h-[60px] fixed w-full transition-all duration-300 top-0 z-50 flex justify-between px-2 lg:h-[80px] xl:h-[100px]`}>
                <div className="lg:w-[200px] xl:w-[240px] bg-transparent flex justify-center items-center">
                    <img src="http://localhost:8000/storage/asset/LogoDashboard.png" alt="Logo Bmc" />
                </div>
                <div className="px-3 md:px-4 lg:px-5 xl:w-1/4 bg-transparent flex justify-center items-center gap-x-5">
                    {Menu.map((item, index) => (
                        <a key={index} href={item.link} className="lg:text-lg xl:text-xl font-semibold text-white hover:text-blue-500 transition-all duration-300">{item.name}</a>
                        ))}
                        {!auth ? (
                            <a  href={'/login'} className="lg:text-lg xl:text-xl font-semibold text-white hover:text-blue-500 transition-all duration-300">Login</a>
                        ) : (
                            <a  href={'/system/user'} className="lg:text-lg xl:text-xl font-semibold text-white hover:text-blue-500 transition-all duration-300">Dashboard</a>
                        )}
                </div>
            </nav >
            <div className=" h-[40px] sticky top-0 z-50 hidden">

            </div>
        </>
    );
}

export default Index;
