import React from "react";
import Homepagemaingraphics from "../components/homepagemaingraphics";
import Homepagefeatures from "../components/homepagefeatures";
import Header from "../components/header";
import Footer from "../components/footer";
import Homepagepricing from "../components/homepagepricing";
function Homepage() {
  return (
    <>
      <Header />
      <Homepagemaingraphics />
      <Homepagefeatures />
      <Homepagepricing />
      <Footer />
    </>
  );
}

export default Homepage;
