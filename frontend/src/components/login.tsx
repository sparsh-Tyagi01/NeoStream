import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import React, { useEffect, useState } from "react";

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [otp, setOtp] = useState("");
  const [isGenerate, setGenerate] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setGenerate(true);

      if (!data) {
        const res = await axiosInstance.post("/auth/send-otp", {
          email: email,
        });
        setData(res.data);
      } else {
        const res = await axiosInstance.post("/auth/verify-otp", {
          email: email,
          otp: otp,
        });
        localStorage.setItem("token", res.data.token);
        if (res.data.email == import.meta.env.VITE_API_ADMIN_EMAIL) {
          localStorage.setItem("adminEmail", res.data.email);
        }
        if (res.status == 201 && res.data.token) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      if (!data) {
        setGenerate(false);
      }
    }
  }

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
          className="w-full h-full absolute top-0 z-10 "
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
            <h1></h1>
          </div>
          <div className="flex justify-center items-center w-full h-[90vh]">
            <div className="flex flex-col items-center w-[70vw] md:w-[30vw] h-[35vh] sm:h-[40vh] md:h-[50vh] bg-black/80 rounded-xl">
              <h1 className="text-white font-bold text-[15px] sm:text-xl md:text-2xl mb-5 mt-5">
                SignIn/SignUp
              </h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block text-white focus:outline-none border-1 border-gray-700 mt-2 w-[62vw] md:w-[22vw] h-[7vh] rounded-[5px] bg-gray-950/50 pl-3"
                />
                {data && (
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block text-white focus:outline-none border-1 border-gray-700 mt-2 w-[62vw] md:w-[22vw] h-[7vh] rounded-[5px] bg-gray-950/50 pl-3"
                  />
                )}

                {isGenerate ? (
                  <button
                    type="submit"
                    className="cursor-pointer bg-red-600 py-2 md:py-1 px-5 text-white rounded-[5px] font-medium w-[62vw] md:w-[22vw] mt-5"
                  >
                    Generating...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="cursor-pointer bg-red-600 py-2 md:py-1 px-5 text-white rounded-[5px] font-medium w-[62vw] md:w-[22vw] mt-5"
                  >
                    {data ? "Get Started" : "Generate OTP"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
