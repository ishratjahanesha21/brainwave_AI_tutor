//signup page component

import { heroBackground } from "../../assets";
import { BackgroundCircles, Gradient } from "../design/Hero";
import Section from "../Section";


const Singup = () => {
  return <>
  
    {/* app design follow */}
    <Section className="bg-primary-1000 text-white" id="signup">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Create Your Account
          </h2>
          <p className="mt-4 text-lg leading-6">
            Join Brainwave today and unlock the power of AI-driven image
            generation. Sign up now to start creating stunning visuals with
            ease!
          </p>
        </div>
        </div>
         <Gradient />
                  
                  <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
                    <img
                      src={heroBackground}
                      className="w-full"
                      width={1440}
                      height={1800}
                      alt="hero"
                    />
                  </div>
        
                  <BackgroundCircles />
    </Section>
    

  </>;
};

export default Singup;