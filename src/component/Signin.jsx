import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinAnimation } from "./SpinAnimation";

export function Signin() {
  const [Message, setmessage] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [data,setdata]=useState(false)


  useEffect(()=>{
    setTimeout(() => {
       setdata(true) 
    }, 500);
  },[])
  return (
    <>
      {data ? ( <div className="bg-zinc-500 h-screen w-full grid grid-cols-9 items-center">
        <div className="col-span-3"></div>
        <div className="col-span-3 h-2/3 bg-white w-72 ml-4 rounded-xl ">
          <div className="mt-5 text-center">
            <h1 className="font-bold font-sans text-2xl">Sign In</h1>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500 px-2 leading-tight ">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold ml-4">Email</p>
            <center>
              <input
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                className="mt-2 border border-1 border-gray-300 pl-2 w-64 rounded-sm text-xs text-gray-500 py-2"
                type="email"
                placeholder="Enter your email"
              ></input>
            </center>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold ml-4">Password</p>
            <center>
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className=" mt-2 border border-1 border-gray-300 pl-2 w-64 rounded-sm text-xs text-gray-500 py-2"
                type="password"
                placeholder="Enter your password"
              ></input>
            </center>
          </div>
          {Message.includes("succesfully") == true ? (
            <p className="mt-2 text-xs text-green-700 ml-4">{Message}</p>
          ) : (
            <p className="mt-2 ml-4 text-xs text-red-500">{Message}</p>
          )}

          <div>
            <center>
              <button
                className="w-64 mt-2 rounded-md bg-black text-white text-xs py-2"
                onClick={() => {
                  fetch("https://paytm-backend-3ujl.onrender.com/api/v1/user/signin", {
                    method: "POST",
                    body: JSON.stringify({
                      username: username,
                      password: password,
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then(async function (res) {
                    const json = await res.json();
                    setmessage(json.message);
                    if (json.message.includes("successfully")) {
                      localStorage.setItem("token", json.token);
                      navigate("/Dashboard",{replace:true});
                    }
                  });
                }}
              >
                Sign in
              </button>
            </center>
          </div>
          <div className="text-xs text-center mt-3">
            <p className="font-semibold ">
              Don't have an account?{" "}
              <a className="underline underline-offset-1" href="/Signup">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="col-span-3"></div>
      </div>):(<div className="h-screen flex justify-center items-center"><SpinAnimation Message={"Loading..."}/></div>)}
     
    </>
  );
}
