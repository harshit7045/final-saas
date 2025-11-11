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
            <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-28 pb-20 overflow-x-hidden" style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <Profile />
                    <Pricing />
                    <Phoneosintgraphics />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profilepage;