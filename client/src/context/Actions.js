export const LoginStart =(userCredentials)=>({
    type: "LOGIN_START"
})

export const LoginSuccess =(userCredentials)=>({
    type: "LOGIN_SUCCESS"
})

export const LoginFailure =(userCredentials)=>({
    type: "LOGIN_FAILURE"
})
export const Logout =(userCredentials)=>({
    type: "LOGOUT"
})


export const UpdateStart = (userCredentials) => ({
    type: "PROFILE_UPDATE_START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "PROFILE_UPDATE_SUCCESS",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "PROFILE_UPDATE_FAILURE",
  });