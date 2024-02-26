import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinAnimation } from "./SpinAnimation";
import { Inputbox } from "./Inputbox";
import { useRecoilState } from "recoil";
import {
  LoadingSigninatom,
  Messagesigninatom,
  emailsigninatom,
  passwordSigninatom,
} from "../../atoms/atoms.Signin";

export function Signin() {
  const navigate = useNavigate();
  const [Message, setmessage] = useRecoilState(Messagesigninatom);
  const [username, setemail] = useRecoilState(emailsigninatom);
  const [password, setpassword] = useRecoilState(passwordSigninatom);
  const [tracker, settracker] = useState(false);
  const [data, setdata] = useRecoilState(LoadingSigninatom);

  useEffect(() => {
    setTimeout(() => {
      setdata(true);
    }, 500);
  }, []);
  return (
    <>
      {data ? (
        <div className="bg-gray-200 h-lvh w-full grid grid-cols-4 md:grid-cols-9 items-center overflow-y-auto ">
          <div className="col-span-1 md:col-span-6 ">
            <div className="flex justify-center items-center">
              <img
                className="w-0 h-0 md:w-60 md:h-32"
                src="/Paytm-Logo.wine.png"
              ></img>
            </div>
          </div>
          <div className="col-span-2 md:col-span-3 mt-12  h-80 bg-white w-72 md:w-11/12  rounded-xl">
            <div className="pt-4 text-center">
              <h1 className="font-bold font-sans text-2xl">Sign In</h1>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-500 px-2 leading-tight">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold ml-4">Email</p>
              <center>
                <Inputbox
                  placeholder="Enter your email"
                  type="text"
                  setvalue={setemail}
                />
              </center>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold ml-4">Password</p>
              <center>
                <Inputbox
                  placeholder="Enter your password"
                  type="password"
                  setvalue={setpassword}
                />
              </center>
            </div>
            {Message.includes("succesfully") ? (
              <p className="mt-3 text-xs text-green-700 ml-6">{Message}</p>
            ) : (
              <p className="mt-3 ml-6 text-xs text-red-500">{Message}</p>
            )}

            <div className="pt-1">
              <center>
                <button
                  className="bg-cyan-500 rounded-md text-white w-11/12 mt-1 text-xs py-1.5 hover:bg-cyan-700"
                  onClick={() => {
                    settracker(true);
                    fetch(
                      "https://paytm-backend-3ujl.onrender.com/api/v1/user/signin",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          username: username,
                          password: password,
                        }),
                        headers: {
                          "Content-type": "application/json",
                        },
                      }
                    ).then(async function (res) {
                      const json = await res.json();
                      setmessage(json.message);
                      if (json.message.includes("successfully")) {
                        settracker(false);
                        setTimeout(() => {
                          setmessage("");
                        }, 5000);
                        localStorage.setItem("token", json.token);
                        navigate("/Dashboard", { replace: true });
                      } else {
                        settracker(false);
                      }
                    });
                  }}
                >
                  {tracker ? (
                    <div className="flex justify-center  items-center">
                      <div
                        class="animate-spin inline-block w-5 h-5 mr-4 border-[3px] border-current border-t-transparent text-white rounded-full "
                        role="status"
                        aria-label="loading"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                      <p>Signing in...</p>
                    </div>
                  ) : (
                    "Signin"
                  )}
                </button>
              </center>
            </div>
            <div className="text-xs text-center  pt-2">
              <p className="font-semibold ">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    navigate("/Signup");
                  }}
                  className="text-cyan-500 hover:text-cyan-700 underline underline-offset-1"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3"></div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <SpinAnimation Message={"Loading..."} />
        </div>
      )}
    </>
  );
}
