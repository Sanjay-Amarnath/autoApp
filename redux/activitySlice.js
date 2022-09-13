import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profileInfo:{},
  userDetails: []
}

export const counterSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserProfileinfo:(initialState,{payload}) => {
      initialState.profileInfo = payload
    },
    getAlluserinfo:(initialState,{payload})=>{
      initialState.userDetails =payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserProfileinfo,getAlluserinfo } = counterSlice.actions

export const userDataState = (state) => state.userData

export default counterSlice.reducer