import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from 'react-hot-toast'

const Register = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [otp, setOtp] = useState("");
  const [isGenerate, setGenerate] = useState(false);
  const [fallbackOtp, setFallbackOtp] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setGenerate(true);

      if (!data) {
        const res = await axiosInstance.post("/auth/send-otp", {
          email: email,
          username: username,
        });
        setData(res.data);

        // Only for demo purpose
        // If backend couldn't send the email (Render SMTP block),
        // it returns the OTP directly in the response.
        if (res.data.emailFailed && res.data.otp) {
          setFallbackOtp(res.data.otp);
        }
      } else {
        const res = await axiosInstance.post("/auth/verify-otp", {
          email: email,
          otp: otp,
          password: password
        });
        localStorage.setItem("token", res.data.token);
        if (res.data.role === "admin") {
          localStorage.setItem("isAdmin", "true");
        }
        localStorage.setItem("username", res.data.username)
        if (res.status == 201 && res.data.token) {
          navigate("/home");
        }
      }
    } catch (error: any) {
      console.error("Register Error:", error);
      const errMsg = error.response?.data?.message || "Registration failed";
      toast.error(errMsg);
    } finally {
      if (!data) {
        setGenerate(false);
      }
    }
  }

  return (
    <>
    <Toaster/>
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
            <div className="flex flex-col items-center w-[70vw] md:w-[30vw] bg-black/80 rounded-xl pb-6">
              <h1 className="text-white font-bold text-[15px] sm:text-xl md:text-2xl mb-5 mt-5">
                SignUp
              </h1>

              {/* ── OTP Fallback Banner ── */}
              <AnimatePresence>
                {fallbackOtp && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-[62vw] md:w-[22vw] mb-4 rounded-lg overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(251,191,36,0.08) 100%)",
                      border: "1px solid rgba(234,179,8,0.35)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Header strip */}
                    <div
                      className="flex items-center gap-2 px-3 py-2"
                      style={{
                        background: "linear-gradient(90deg, rgba(234,179,8,0.25) 0%, transparent 100%)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="#EAB308"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-yellow-400 font-semibold text-xs tracking-wide uppercase">
                        Deployment Notice
                      </span>
                    </div>

                    {/* OTP display */}
                    <div className="px-3 pt-2 pb-1 flex items-center justify-center">
                      <span className="text-white text-xs mr-2">Your OTP:</span>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="font-mono font-bold text-lg tracking-[0.3em] px-3 py-1 rounded"
                        style={{
                          background: "rgba(234,179,8,0.12)",
                          color: "#FBBF24",
                          border: "1px dashed rgba(251,191,36,0.4)",
                          letterSpacing: "0.3em",
                        }}
                      >
                        {fallbackOtp}
                      </motion.span>
                    </div>

                    {/* Explanation */}
                    <p
                      className="text-[10px] leading-relaxed px-3 pt-1 pb-3"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      This backend is hosted on{" "}
                      <span className="text-yellow-400/80 font-medium">Render (free tier)</span>,
                      which blocks outbound SMTP/email services. The OTP is
                      displayed here instead of being sent to your email.
                      In production with a paid hosting provider, this OTP
                      would be delivered securely via email.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 required
                 name="username"
                 value={username}
                 onChange={(e)=> setUsername(e.target.value)}
                 placeholder="Enter your username"
                 className="block text-white focus:outline-none border-1 border-gray-700 mt-2 w-[62vw] md:w-[22vw] h-[7vh] rounded-[5px] bg-gray-950/50 pl-3"
                />
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
                  <>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block text-white focus:outline-none border-1 border-gray-700 mt-2 w-[62vw] md:w-[22vw] h-[7vh] rounded-[5px] bg-gray-950/50 pl-3"
                  />
                  <input
                 type="password"
                 name="password"
                 required
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 placeholder="Create your password"
                 className="block text-white focus:outline-none border-1 border-gray-700 mt-2 w-[62vw] md:w-[22vw] h-[7vh] rounded-[5px] bg-gray-950/50 pl-3"
                />
                  </>
                  
                )}

                {isGenerate ? (
                  <button
                    type="submit"
                    className="cursor-pointer bg-red-600 py-2 md:py-1 px-5 text-white rounded-[5px] font-medium w-[62vw] md:w-[22vw] mt-5"
                    disabled
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

                <p className="text-center text-white text-sm pt-4 cursor-default">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={()=> navigate("/login")}>SignIn</span></p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;

