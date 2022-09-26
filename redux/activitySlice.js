import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileInfo: {},
  userDetails: [],
  Allmessages: [],
  sentMessages: [],
  recivedMessages: [],
};

export const counterSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getUserProfileinfo: (initialState, { payload }) => {
      initialState.profileInfo = payload;
    },
    getAlluserinfo: (initialState, { payload }) => {
      initialState.userDetails = payload;
    },
    getSentMessage: (initialState, { payload }) => {
      const mapingData = payload.map((e) => {
        return e;
      });
      initialState.sentMessages = mapingData;
    },
    getRecivedMessage: (initialState, { payload }) => {
      const mapingData = payload.map((e) => {
        return e;
      });
      initialState.recivedMessages = mapingData;
    },
    getAllMessage: (initialState) => {
      const combineData = initialState.sentMessages.concat(
        initialState.recivedMessages
      );
      // console.log(initialState.sentMessages, initialState.recivedMessage);
      initialState.Allmessages = combineData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getUserProfileinfo,
  getAlluserinfo,
  getAllMessage,
  getSentMessage,
  getRecivedMessage,
} = counterSlice.actions;

export const userDataState = (state) => state.userData;

export default counterSlice.reducer;
