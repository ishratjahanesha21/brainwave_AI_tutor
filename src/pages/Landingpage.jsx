import Benefits from "../components/Benefits"
import Collaboration from "../components/Collaboration"
import Services from "../components/Services"
import Pricing from "../components/Pricing"
import Roadmap from "../components/Roadmap"
import Hero from "../components/Hero"

const Landingpage = () => {
  return (
    <>
    <Hero/>
        <Benefits/>
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
    </>
  )
}

export default Landingpage