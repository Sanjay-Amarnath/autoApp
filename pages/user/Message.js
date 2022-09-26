import { Button, TextField } from "@mui/material";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import {
  auth,
  getFirebaseAuth,
  getMessages,
  recivedMessage,
  sendMessage,
} from "../../firebase/authProvider";
import { getAllMessage, userDataState } from "../../redux/activitySlice";
import CachedIcon from "@mui/icons-material/Cached";
function Message() {
  const { profileInfo, sentMessages, recivedMessages, Allmessages } =
    useSelector(userDataState);
  const dispatch = useDispatch();
  const { query } = useRouter();

  const [msg, setMsg] = useState();
  const [getMsg, setGetMsg] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getFirebaseAuth());
  }, []);

  const onChangeMsg = (e) => {
    const { value } = e.target;
    setMsg(value);
  };

  const msgHandler = () => {
    sendMessage(auth.currentUser?.displayName, query?.keyword, msg, setMsg,reloadFunction);
  };

  const reloadFunction = () => {
    setReload(!reload);
  };

  useEffect(() => {
    dispatch(
      getMessages(auth.currentUser?.displayName, query?.keyword, getMsg)
    );
    dispatch(
      recivedMessage(auth.currentUser?.displayName, query?.keyword, getMsg)
    );
    dispatch(getAllMessage());
  }, [reload]);

  // order the Arrays
  //   const myParseDate = (date_string) => {
  //     let [y, M, d, h, m, s] = date_string?.split(/[- :T]/);
  //     return new Date(y, parseInt(M) - 1, d, h, parseInt(m), s.replace("Z", ""));
  //   };

  //   const sortedData =  Allmessages.sort((a, b)=>{
  //     if (a.timestamp.toDate()  && b.timestamp.toDate()) {
  //         return myParseDate(b?.timestamp?.toDate()) - myParseDate(a?.timestamp?.toDate())
  //     }
  //     else if (a.hasOwnProperty("publish"))
  //         return -1;
  //     else if (b.hasOwnProperty("publish"))
  //         return 1;
  //     else
  //         return 0;
  // } );
  //   console.log(sortedData)


  return (
    <>
      <Navbar />

      <br />
      <div className={"h-[90vh] w-[50%]  m-auto flex flex-col justify-evenly"}>
        <div
          className={
            "bg-[#1f2937fa] overflow-auto text-white rounded-md p-6 h-[90%]"
          }
        >
          {Allmessages.map((i) => {
            return (
              <>
                <div
                  style={{ margin: "7px" }}
                  className={
                    auth.currentUser?.displayName === i.name
                      ? "text_message_div flex justify-end"
                      : "text_message_div flex"
                  }
                >
                  <p className={"text_message"}>{i.message}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className={"flex justify-center gap-4"}>
          <TextField
            id="filled-basic"
            size="small"
            variant="filled"
            className="w-[20rem]"
            value={msg}
            onChange={onChangeMsg}
          />
          <Button variant="outlined" size="medium" onClick={msgHandler}>
            send
          </Button>
          <button
            className="bg-cyan-500 rounded-full text-white p-2"
            onClick={reloadFunction}
          >
            <CachedIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default Message;
