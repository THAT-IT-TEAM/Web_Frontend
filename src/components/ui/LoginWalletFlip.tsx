import { useState } from "react";
import { motion } from "framer-motion";
import { login } from "./auth";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginWalletFlip = () => {
  const [flipped, setFlipped] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    walletId: "",
  });
  //   const [role, setRole] = useState("admin");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#141414] flex justify-center items-center relative">
      <IoArrowBackOutline className="text-gray-50 w-10 h-10 top-5 left-5 absolute" onClick={()=>{navigate("/main")}}/>
      <div style={{ perspective: 1200 }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            width: 400,
            height: 350,
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Login Face */}
          <div
            className={`absolute w-full h-full transition-opacity duration-200 ${
              flipped
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100"
            }`}
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <form
              className="bg-black p-5 rounded-xl border-2 border-gray-50 w-full h-[400px] shadow-neumorphic flex flex-col items-center justify-center gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setFlipped(true);
              }}
            >
              <p className="text-gray-200 font-bold text-2xl mb-4 flex flex-col font-sans">
                Welcome,
                <span className="text-gray-300 font-semibold font-mono text-xl">
                  sign in to continue
                </span>
              </p>
              <div className="flex">
                <label className="relative block w-[15px] h-[15px] cursor-pointer border-[3px] border-transparent rounded-[10px] shadow-[0_0_0_2px_#fff] overflow-hidden text-white">
                  <input
                    type="radio"
                    name="type"
                    className="absolute left-[50px] invisible peer"
                    defaultChecked
                  />
                  <div className="w-[60px] h-[60px] bg-white rotate-45 absolute z-[100] top-[-52px] left-[-52px] peer-checked:top-[-10px] peer-checked:left-[-10px] transition-all duration-300 ease-in-out"></div>
                </label>
                <p className="text-white px-[10px] -translate-y-1">Admin</p>

                <label className="relative block w-[15px] h-[15px] cursor-pointer border-[3px] border-transparent rounded-[10px] shadow-[0_0_0_2px_#fff] overflow-hidden text-white">
                  <input
                    type="radio"
                    name="type"
                    className="absolute left-[50px] invisible peer"
                  />
                  <div className="w-[60px] h-[60px] bg-white rotate-45 absolute z-[100] top-[-52px] left-[-52px] peer-checked:top-[-10px] peer-checked:left-[-10px] transition-all duration-300 ease-in-out"></div>
                </label>
                <p className="text-white px-[10px] -translate-y-1">User</p>

              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-[250px] h-[40px] px-3 py-1.5 rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-sm font-semibold text-gray-800 outline-none "
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-[250px] h-[40px] px-3 py-1.5 rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-sm font-semibold text-gray-800 outline-none "
              />
              <button
                type="submit"
                className="mt-10 flex items-center justify-center gap-2 w-[250px] h-[40px] rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-gray-800 font-semibold text-base relative overflow-hidden z-10 hover:text-gray-100 group transition-all duration-300"
              >
                <span className="z-20">Continue</span>
                <svg
                  className="w-6 h-6 z-20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 17l5-5-5-5" />
                  <path d="M13 17l5-5-5-5" />
                </svg>
                <span className="absolute top-0 left-0 w-0 h-full bg-gray-700 z-0 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </form>
          </div>
          {/* Wallet Face */}
          <div
            className={`absolute w-full h-full transition-opacity duration-200 ${
              flipped
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="bg-black p-5 rounded-xl border-2 border-gray-50 w-[400px] h-[350px] shadow-neumorphic flex flex-col items-center justify-center gap-5">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setError(null);
                  try {
                    const { email, password, walletId } = loginData;
                    const response = await login(email, password, walletId);

                    // Navigate based on role
                    if (response.user.role === "admin") navigate("/admin");
                    else if (response.user.role === "user") navigate("/user");
                    else navigate("/vendor");
                  } catch (err: any) {
                    setError(err.message || "Login failed");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <p className="text-gray-200 font-bold text-2xl mb-4 flex flex-col font-sans ">
                  <span>Great..</span>
                  <span className="text-gray-300 font-semibold  font-mono text-xl">
                    Enter your Wallet Id
                  </span>
                </p>
                <input
                  type="text"
                  placeholder="Wallet Id"
                  name="walletId"
                  value={loginData.walletId}
                  onChange={(e) =>
                    setLoginData({ ...loginData, walletId: e.target.value })
                  }
                  className="w-[250px] h-[40px] px-3 py-1.5 rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-sm font-semibold text-gray-800 outline-none "
                />
                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-10 flex items-center justify-center gap-2 w-[250px] h-[40px] rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-gray-800 font-semibold text-base relative overflow-hidden z-10 hover:text-gray-100 group transition-all duration-300"
                >
                  <span className="z-20">
                    {loading ? "Logging in..." : "Continue"}
                  </span>
                  <svg
                    className="w-6 h-6 z-20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 17l5-5-5-5" />
                    <path d="M13 17l5-5-5-5" />
                  </svg>
                  <span className="absolute top-0 left-0 w-0 h-full bg-gray-700 z-0 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </form>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="flex items-center justify-center gap-2 w-[250px] h-[40px] rounded-md border-2 border-gray-800 bg-white shadow-neumorphic text-gray-800 font-semibold text-base relative overflow-hidden z-10 hover:text-gray-100 group transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 z-20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 7l-5 5 5 5" />
                  <path d="M11 7l-5 5 5 5" />
                </svg>
                <span className="z-20">Previous</span>
                <span className="absolute top-0 right-0 w-0 h-full bg-gray-700 z-0 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default LoginWalletFlip;
