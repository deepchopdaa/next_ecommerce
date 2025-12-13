import Image from "next/image";
import HeroSlider from "./(user)/Components/HeroSection";
import Main from "./(user)/Components/Main";
import Headers from "./(user)/Components/Header";
import Footer from "./(user)/Components/Footer";

export default function Home() {
  return (
    <div className=" min-h-screen font-sans bg-white">
      <Headers />
      <HeroSlider />
      <Main />
      <Footer />
    </div>
  );
}
