import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Victory from "../assets/victory.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Background from "../assets/login2.png"
import axios from "../axios/axiosIntersepter"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const navigate =useNavigate()
  const handleLogin = async() => {
    await  axios.post("/api/auth/login",{email,password}).then((response)=>{
     navigate("/dashboard")
     toast.success("Login Successfully")
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("user",response.data.user)
    }).catch((error)=>{
      toast.error(error.response.data.error.message)
    })
  };
  const handleSignup = async() => {
    await axios.post("/api/auth/signup",{email,password,confirmPassword}).then(()=>{
      navigate("/login")
      toast("Accound Created now Login")
    }).catch((error)=>{
      toast(error.response.data.error.message)
    })
  };
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill Your Details to get Start
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full ">
                <TabsTrigger
                  value="Login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-purple-500 p-3 transition-all duration-300"
                  value="Signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className=" flex flex-col gap-5 mt-10 "
                value="Login"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent className=" flex flex-col gap-5 " value="Signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="ConfirmPassword"
                  type="passsword"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex justify-center items-center ">
            <img src={Background} alt="Background image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
