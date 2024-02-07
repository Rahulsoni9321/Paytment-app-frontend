import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SpinAnimation } from "./SpinAnimation";

export function Send() {
  const navigate=useNavigate();
  const [amount, setamount] = useState("");
  const [tracker, settracker] = useState(false);
  const [message, setmessage] = useState("")
  const [searchParams] = useSearchParams();
  const [data,setdata]=useState(false)
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  useEffect( ()=>{
     setTimeout(() => {
      setdata(true)
     }, 500);
  },[])

  return (
    <>
    {
      data ? (
        <div className="h-screen w-full grid grid-cols-9 items-center bg-gray-100">
        <div className="col-span-3"></div>
        <div className="col-span-3 w-full h-3/5 bg-white rounded-lg shadow-xl ">
          <div className="text-center text-3xl font-bold mt-8">Send Money</div>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex justify-start ml-5 items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white ml-4 text-center text-xl p-1 mr-4">
              {name[0].toUpperCase()}
            </div>
            <p className="text-2xl font-semibold">{name}</p>
          </div>
          <div className="ml-10 text-sm font-medium mt-2">Amount (in Rs)</div>
          <div className="text-center mt-2 ">
            <input
              className="w-5/6 border border-1 border-gray-300 outline-none pl-3 rounded-md py-1"
              placeholder="Enter amount"
              onChange={(e) => {
                setamount(e.target.value);
              }}
              type="text"
            ></input>
          </div>

          {/* message that gives the status whether the transaction is successful of failed */}
          <div>

          { message.includes("successfully") ? (
          <p className="text-green-500 ml-9 mt-1 text-sm font-semibold">
            {message}
          </p>
        ) : (
          <p className="text-red-500 ml-9 mt-1 text-sm font-semibold">
            {message}
          </p>
        )}
          </div>
         

          <div className="text-center">
            <button
              className=" py-2 rounded-md mt-2 text-sm w-5/6 text-white bg-cyan-500"
              onClick={async () => {
                if (isNaN(amount)){
                setmessage("Please enter valid number.")
                  return ;
                }
               else{ if (amount.trim()===""){
                  setmessage("Please enter valid amount")
                  setTimeout(() => {
                    setmessage("")
                  }, 3000);
                  return;
                }
                settracker(true)
                try{
                const response = await axios.post(
                  "https://paytm-backend-3ujl.onrender.com/api/v1/account/transfer",
                  {
                    to: id,
                    amount: amount
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      'Content-Type': 'application/json',
                    },
                  }
                );
                if (response.data.message.includes("successfully")){
                  settracker(false)
                  setmessage(response.data.message)
                  setTimeout(() => {  
                    alert(response.data.message);
                    navigate("/TransactionCompleted")

                  }, 1000);
                }
              }
              catch(error){
                if (error.response && error.response.data) {
                  // Check if the error response has a message key
                  const errorMessage = error.response.data.message;
                  setmessage(errorMessage || "An error occurred while sending money. Please try again.");
                } else {
                  // If no specific message in the error response, set a generic error message
                  setmessage("An error occurred while sending money. Please try again.");
                }
            }
               } }}
            >
              {tracker ? (<div className="flex justify-center  items-center"><div
            class="animate-spin inline-block w-5 h-5 mr-4 border-[3px] border-current border-t-transparent text-white rounded-full "
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span></div><p>Processing...</p></div>):"Initiate Transfer"}
            </button>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>

      ) : (<div className="h-screen flex justify-center items-center"><SpinAnimation Message={"Loading..."}/></div>)
    }
      
    </>
  );
}
