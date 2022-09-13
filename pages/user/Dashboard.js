import React, { useEffect, useState } from "react";
import {
  getAllFirebaseUserInfo,
  getFirebaseAuth,
} from "../../firebase/authProvider";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import withAuth from "../../projectHelper/withAuth";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { userDataState } from "../../redux/activitySlice";

function Demo() {

  const router = useRouter()
  const dispatch = useDispatch();

  const { userDetails, profileInfo } = useSelector(userDataState);

  useEffect(() => {
    dispatch(getAllFirebaseUserInfo());
  }, []);

  const filterData = userDetails.filter((i) => {
    return i.data().uid !== profileInfo?.uid;
  });

  const sendMsg =()=>{
    router.push("/user/Message");
  }

  return (
    <>
      <Navbar />
      <div className="container div-container p-4">
        <div className="flex justify-evenly ">
          {filterData.map((i) => {
            return (
              <div className="shadow shadow-blue-500/40  bg-gray-800  rounded hover:shadow-xl">
                <img
                  src={
                    i.data()?.profile ??
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  className="rounded-t h-235px w-100"
                  alt={"demo"}
                />
                <div className="p-2 text-center text-white flex justify-between">
                  <p>{i.data()?.name ?? i.data()?.email}</p>
                  <div>
                    <SendIcon onClick={sendMsg}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default withAuth(Demo);
