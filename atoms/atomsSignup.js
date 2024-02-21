import { atom, selector } from "recoil";



export const  MessageSignupAtom=atom({
    key:"MessageSignupAtom",
    default:""
})
export const  firstnameSignupAtom=atom({
    key:"firstnameSignupAtom",
    default:""
})
export const  lastnameSignupAtom=atom({
    key:"lastnameSignupAtom",
    default:""
})
export const  emailSignupAtom=atom({
    key:"emailSignupAtom",
    default:""
})
export const  passwordSignupAtom=atom({
    key:"passwordSignupAtom",
    default:""
})
export const  LoadingSignupAtom=atom({
    key:"LoadingSignupAtom",
    default:false
})
