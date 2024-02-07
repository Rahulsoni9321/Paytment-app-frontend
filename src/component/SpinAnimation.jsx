export function SpinAnimation({Message}) {
    return (<><div className="flex items-center ">
     <div className="flex items-center ml-12 mt-6">
          <div
            class="animate-spin inline-block w-8 h-8 mr-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        <div className="text-center text-xl font-semibold shadow-3xl ml-4">
         {Message}
        </div>
        </div>
        </div>
    </>)
}