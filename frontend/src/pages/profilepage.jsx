import React from "react";
import Header from "../components/header";
import Profile from "../components/profiledetails";
import Pricing from "../components/profilespayout";
import Footer from "../components/footer";
import Homepagepricing from "../components/homepagepricing";
import Phoneosintgraphics from "../components/phoneosintgraphics";

function Profilepage() {
    return (
        <>
            <Header />
            <Profile />
            <Pricing />
            <Phoneosintgraphics />
            <Footer />
        </>
    );
}

export default Profilepage;