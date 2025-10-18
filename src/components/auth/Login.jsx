//login page
import { heroBackground } from "../../assets";
import { BackgroundCircles, Gradient } from "../design/Hero";
import Section from "../Section"; 
const Login = () => {
  return <>
  
    {/* app design follow */}
    <Section className="bg-primary-1000 text-white" id="login">
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
    </>}
    export default Login;