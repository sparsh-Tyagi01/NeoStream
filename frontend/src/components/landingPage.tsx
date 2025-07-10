import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <motion.img
          src="neo-poster.jpg"
          alt="background image"
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="h-full w-full absolute top-0 left-0 z-0"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full absolute top-0 z-10 bg-black/40"
        >
          <div className="flex flex-col sm:flex-row justify-around items-center mt-4 px-6 gap-4 sm:gap-0">
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl font-extrabold bg-gradient-to-r from-red-600 via-pink-500 to-red-700 text-transparent bg-clip-text drop-shadow-[0_0_2px_rgba(255,0,0,0.8)] tracking-wider animate-pulse"
            >
              NEOSTREAM
            </motion.h1>
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-1.5 px-4 rounded-md shadow-md hover:scale-105 hover:from-pink-600 hover:to-red-700 transition-all duration-300"
            >
              Sign Up/ Sign IN
            </button>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-[90vh]">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-3xl sm:text-4xl md:text-6xl font-bold"
            >
              Unlimited movies, TV
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-3xl sm:text-4xl md:text-6xl font-bold"
            >
              Shows and more
            </motion.h1>
            <h1 className="text-white text-xl font-medium mt-10">
              Ready to watch?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[20px] font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 py-2 px-4 rounded-[8px] shadow-lg hover:scale-105 hover:from-pink-600 hover:to-red-700 transition-transform duration-300"
              >
                Get Started
              </button>
            </h1>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
