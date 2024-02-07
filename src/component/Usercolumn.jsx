import { useNavigate } from "react-router-dom"

export function Usercolumn({firstname,lastname,id}) {
    const navigate=useNavigate()
    return (
        <div className="flex justify-between mt-2">
      
        <div className="mr-8 ml-4 flex justify-between ">
       <div className="w-7 h-7 rounded-full bg-blue-900 text-white shadow-md  text-center text-sm p-1 ml-2">
         {firstname[0].toUpperCase()}
       </div>
       <span className="font-bold ml-4 text-md">{firstname} {lastname}</span>
     </div>

     <div className="mr-2 ">
       <button className="bg-cyan-500 w-32 text-white shadow-xl rounded-md text-sm p-2 font-semibold mr-7 mb-2" onClick={()=>{navigate("/Send?id="+id+"&name="+firstname)}}>
         Send Money
       </button>
     </div>
   </div>
   
    )
}