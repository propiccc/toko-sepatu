import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Index";
import "./Style.css";
import "@splidejs/react-splide/css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
// * components
import LoadingPage from "../../../Components/LoadingPage";


function Home() {
    // * setup
    const [DataResource, setDataResource] = useState([]);
    const [Block, setBlock] = useState(true);
    const [auth, setAuth] = useState(null);

    // * Api Call
    const getDataResource = () => {
        setBlock(true);
        var check = "/api/check";
        window.axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('access_token');
        axios
            .post(check)
            .then((res) => {
                setAuth(res.data.auth === true ? true : false);
            })
            .finally(() => {
                setBlock(false);
            });
    };

    // * effect
    useEffect(() => {
        var a = true;
        if (a) {
            AOS.init();
            getDataResource();
        }
        return () => {
            a = false;
        };
    }, []);
    return (
        <>
            {Block ? (
                <LoadingPage />
            ) : (
                <>
                    <Navbar auth={auth} />
                </>
            )}
        </>
    );
}

export default Home;
