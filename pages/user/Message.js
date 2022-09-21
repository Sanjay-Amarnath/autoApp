import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { db, sendMessage } from "../../firebase/authProvider";


function Message() {
  const [msg, setMsg] = useState();

  console.log(db)

  const onChangeMsg = (e) => {
    const { value } = e.target;
    setMsg(value);
    
  };

  const msgHandler = () => {
    console.log(msg);
    sendMessage(msg,setMsg)
  };

  return (
    <>
      <Navbar />

      <br />
      <div className="p-5 flex items-end postion-fixed justify-center h-[90vh]">
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
      </div>
    </>
  );
}

export default Message;
