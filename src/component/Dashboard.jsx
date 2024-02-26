import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Usercolumn } from "./Usercolumn";
import { Animationuser } from "./Animationuser";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  AllUsersAtom,
  AllUsersStatus,
  BalanceAtom,
  DebouncedAtom,
  UserDataAtom,
  filterUser,
} from "../../atoms/atomsDashboard";
import { SpinAnimation } from "./SpinAnimation";

function useDebounce(input) {
  const [debounced, setdebounced] = useRecoilState(DebouncedAtom);

  useEffect(() => {
    let intervalnumber = setTimeout(() => {
      setdebounced(input);
    }, 100);

    return () => {
      clearTimeout(intervalnumber);
    };
  }, [input]);

  return debounced;
}

export function Dashboard() {
  const navigate = useNavigate();
  const balance = useRecoilValueLoadable(BalanceAtom);
  const UserdataLoadable = useRecoilValueLoadable(UserDataAtom);
  const [allusers, setallusers] = useRecoilState(AllUsersAtom);
  const [filters, setfilter] = useRecoilState(filterUser);
  const [data, setdata] = useRecoilState(AllUsersStatus);
  const debounce = useDebounce(filters);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://paytm-backend-3ujl.onrender.com/api/v1/user/bulk?name=${debounce}`,
          {
            headers: {
              Authorization: `Bearer +${localStorage.getItem("token")}`,
            },
          }
        );
        setallusers(response.data.user);
        setdata(true)
      } catch (e) {
        console.error("Error fetching data" + e);
      }
    };

    setTimeout(() => {
      setdata(true);
    }, 1000);

    fetch();
  }, [debounce]);

  return (
    <>
      <div className="h-full w-full font-sans ">
        <Navbar />

        <br></br>
        <div className="flex items-center font-bold ml-5 text-lg md:text-2xl">
          <p>Your Balance </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="darkblue"
            className="ml-2 mr-2 w-12 h-8"
          >
            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
          </svg>
          : Rs &#160;{" "}
          {balance.state == "loading" ? (
            <div class=" flex items-center mt-1 rounded-md ml-2 w-24 ">
              <div className="h-4 w-5/6 animate-pulse bg-slate-400 rounded-lg"></div>
            </div>
          ) : (
            <span className="text-green-600 font-normal">
              {" "}
              {balance.contents}/-
            </span>
          )}
        </div>
        <br></br>

        <div className="flex font-bold ml-6 items-center text-lg md:text-2xl">
          <p>Find Users..</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="darkblue"
            class="mx-1 w-12 h-8"
          >
            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <br></br>
        <div className="text-center">
          <input
            onChange={(e) => {
              setfilter(e.target.value);
            }}
            className="w-11/12 pl-2 py-1 border border-1 border-gray-300 shadow-md rounded-md"
            type="text"
            placeholder="Search users..."
          ></input>
        </div>

        <br></br>
        {!data ? (
          <div class="  rounded-md p-4 w-full mx-auto">
            <Animationuser></Animationuser>
            <Animationuser></Animationuser>
            <Animationuser></Animationuser>
            <Animationuser></Animationuser>
          </div>
        ) : allusers.length > 0 ? (
          allusers.map((users) =>
            users.id.trim() === UserdataLoadable.contents.userId ? (
              ""
            ) : (
              <Usercolumn
                firstname={users.firstname}
                lastname={users.lastname}
                id={users.id}
              />
            )
          )
        ) : (
          <p className=" ml-4 md:ml-12 text-black font-semibold text-md md:text-lg">
            No Users Found..
          </p>
        )}
      </div>
    </>
  );
}

function Navbar() {
  const UserdataLoadable = useRecoilValueLoadable(UserDataAtom);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center  shadow-md  bg-white">
        <div className="flex font-bold ml-2 md:ml-12 text-3xl ">
          <img className="w-56 h-24" src="/Paytm-Logo.wine.png"></img>
        </div>
        <div className="mr-4 md:mr-16 flex justify-between ">
          {UserdataLoadable.state == "loading" ? (
            <div className="text-xl font-semibold text-black flex justify-between">
              <SpinAnimation></SpinAnimation>
              <div>Loading...</div>
            </div>
          ) : (
            <>
              <span className="font-semibold text-black  text-md md:text-xl">
                Hello,{UserdataLoadable.contents.name}
              </span>
              <div className="w-7 h-7 rounded-full font-bold bg-blue-900 text-white  text-center text-sm p-1 ml-2 md:ml-4">
                {UserdataLoadable.contents.name &&
                UserdataLoadable.contents.name.length > 0
                  ? UserdataLoadable.contents.name[0]
                  : ""}
              </div>
              <div>
                <button
                  className="bg-white text-md md:text-lg text-black  ml-4 font-semibold underline underline-offset-1"
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Logout?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
