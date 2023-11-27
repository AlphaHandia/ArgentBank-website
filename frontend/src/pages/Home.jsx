import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import Feature from "../components/Feature/Feature";
import Footer from "../components/Footer/Footer";
import chatIcon from "../../../Backend/designs/img/icon-chat.png";
import moneyIcon from "../assets/icon-money.webp";
import securityIcon from "../assets/icon-security.webp";

const Home = () =>{
return (
    <div>
        <Navbar/>
        <main>
            <Banner/>
            <section className="features">
                <h2 className="sr-only ">Features</h2>
                <Feature 
                   title="You are our #1 priority"
                   content="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                   imageSrc={chatIcon}
                   altText="Chat icon"
                 />
                    <Feature
            title="More savings means higher rates"
            content="The more you save with us, the higher your interest rate will be!"
            imageSrc={moneyIcon}
            altText="Money icon"
          />

          <Feature
            title="Security you can trust"
            content="We use top of the line encryption to make sure your data and money is always safe."
            imageSrc={securityIcon}
            altText="Security icon"
          />

            </section>
        </main>
        <Footer />
    </div>
);
};

export default Home