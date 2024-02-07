import { useEffect, useState } from "react"
import {Signin} from "./Signin"
import { useNavigate } from "react-router-dom"
import { SpinAnimation } from "./SpinAnimation"
import axios from "axios"
// import 'tailwindcss/tailwind.css';



export  function Signup(){
   const [Message,setmessage]=useState("")
   const [firstname,setfirstname]=useState("")  
   const [lastname,setlastname]=useState("")
   const [email,seteemail]=useState("")
   const [password,setpassword]=useState("")
   const [data,setdata]=useState(false)
   const navigate=useNavigate();

   useEffect(()=>{
     setTimeout(() => {
      setdata(true)
     }, 500);
   },[])
    return (<>
    {data ? (
      <div className="h-screen w-full bg-zinc-500 grid  grid-cols-9 items-center">
            <div className="col-span-3">

            </div>
    <div className=" bg-white h-5/6 w-72 rounded-xl col-span-3 ">
         <div>
            <h1 className="text-center  font-bold text-3xl mt-3">Sign Up</h1>
         </div>
         <center>
         <div className="text-center text-sm mt-2 px-4 leading-tight text-gray-500">
            Enter your information to create your account
         </div>
         </center>
         <div>
            <p className="font-bold text-black text-xs ml-4 mt-4 ">First Name</p>
            <center><input onChange={(e)=>{setfirstname(e.target.value)}} className="border border-1 border-gray-300 w-64 pl-2 rounded-md text-xs mt-2 py-2 text-gray-500" type="text" placeholder="enter your first name"></input></center>
         </div>
       
         <div>
            <p className="font-bold text-black mt-3 ml-4 text-xs">Last Name</p>
           <center> <input onChange={(e)=>{setlastname(e.target.value)}} className="border border-1 border-gray-300 w-64 pl-2 rounded-md text-xs mt-2 py-2 text-gray-500" type="text" placeholder="enter your lastname"></input></center>
         </div>
        
         <div>
            <p className="font-bold text-black mt-3 ml-4 text-xs">Email</p>
            <center>  <input onChange={(e)=>{seteemail(e.target.value)}} className="border border-1 border-gray-300 w-64 pl-2 rounded-md text-xs mt-2 py-2 text-gray-500" type="text" placeholder="enter your username"></input> </center> 
         </div>
         
         <div>
            <p className="font-bold text-black mt-3 ml-4 text-xs">Password</p>
            <center>  <input onChange={(e)=>{setpassword(e.target.value)}} className="border border-1 border-gray-300 w-64 pl-2  text-xs rounded-md mt-2 py-2 text-gray-500" type="password" placeholder="enter your password"></input> </center> 
         </div>
         { Message.includes("successfully")  ? (<p className="text-xs text-green-500 ml-4 mt-1 font-medium">{Message}</p>) : (<p className="text-xs text-red-500 ml-4 mt-1 font-medium">{Message}</p>)} 
        
         <div>
         <center>  <button className=" bg-black rounded-md text-white w-64 mt-2 text-xs py-1.5"  onClick={async ()=>{
            email.trim()
            firstname.trim()
            lastname.trim()
            password.trim()
            try{
             const res=await axios.post("https://paytm-backend-3ujl.onrender.com/api/v1/user/signup",{
                  username:email,
                  firstname:firstname,
                  lastname:lastname,
                  password:password
               },{
                  headers:{
                     "Content-type":"application/json",
                  },
               }
            )
               setmessage(response.data.message);
               if (response.data.message.includes("successfully")){
                  localStorage.setItem("token",response.data.token);
                  navigate('/Dashboard',{replace:true})
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
            
            
         }}>Sign up</button> </center> 
         </div>
         <div className=" text-xs font-semibold text-center mt-2 mb-2">
            <h2>Already have an account? <a className="text-black underline underline-offset-1 " href="/Signin">Login</a></h2>
         </div>
    </div> 
    <div className="col-span-3">

</div>
    </div>):(<div className="h-screen flex justify-center items-center"><SpinAnimation Message={"Loading..."}/></div>)}
    </>
    )
}