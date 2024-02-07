function Inputbox({placeholder}) {
   return <>
    <center>
        <input
          onChange={(e) => {
            setlastname(e.target.value);
          }}
          className="border border-1 border-gray-300 w-64 pl-2 rounded-md text-xs mt-2 py-2 text-gray-500"
          type="text"
          placeholder={placeholder}
        ></input>
      </center>
   </>
}