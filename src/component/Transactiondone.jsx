import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpinAnimation } from "./SpinAnimation";

export function Transactiondone() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard",{replace:true});
    }, 4000);
  }, []);
  return (
    <div className="flex justify-center w-full h-screen pt-16">
      <div>
      <img className="w-60 h-32 ml-28" src="/Paytm-Logo.wine.png"></img>
    <div className="flex justify-center items-center w-full   ">
      <div>
        <div className="flex justify-center items-center  ">
          <div className="drop-shadow-xl">
            <p className="text-cyan-500 text-3xl font-bold">
              Amount Transferred Succesfully{" "}
            </p>{" "}
          </div>

          <div className="text-cyan-500 ml-4 drop-shadow-3xl">
            <svg
              className="stroke-cyan-500 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="w-16 h-16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
       <SpinAnimation Message={"Redirecting to Dashboard...."}/>
      </div>
      </div>
    </div>
    </div>
  );
}
