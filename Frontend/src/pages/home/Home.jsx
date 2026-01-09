import Orb from "./Orb";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Orb Background (FULL SCREEN) */}
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={1.6}
          rotateOnHover={true}
          hue={360}
          forceHoverState={false}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6 pointer-events-none">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            University Course Management System
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Please login or register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
