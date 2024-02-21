import axios from "axios";
import { atom, selector } from "recoil";

export const BalanceAtom = atom({
  key: "BalanceAtom",
  default: selector({
    key: "Balance",
    get: async () => {
      const response = await axios.get(
        "https://paytm-backend-3ujl.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.balance;
    },
  }),
});

const UserDataSelector = selector({
  key: "UserDataSelector",
  get: async () => {
    const response = await axios.get(
      "https://paytm-backend-3ujl.onrender.com/api/v1/user/userprofile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    let name = response.data.user.firstname;
    const capitalizedname = name.charAt(0).toUpperCase() + name.slice(1);
    return { name: capitalizedname, userId: response.data.user._id };
  },
});
export const UserDataAtom = atom({
  key: "UserDataAtom",
  default: UserDataSelector,
});

export const AllUsersAtom = atom({
  key: "AllUsersAtom",
  default: [],
});



export const AllUsersStatus = atom({
  key: "useRecoilState",
  default: false,
});
export const filterUser = atom({
  key: "filterUser",
  default: "",
});

export const DebouncedAtom=atom({
    key:"DebouncedAtom",
    default:""
})
