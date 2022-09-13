import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

function Message() {
  const [msg, setMsg] = useState();

  const onChangeMsg = (e) => {
    const { value } = e.target;
    setMsg(value);
  };

  const msgHandler = () => {
    console.log(msg);
  };
  
  return (
    <>
      <Navbar />
      <div className="p-5 flex items-center">
        <TextField
          id="filled-basic"
          size="small"
          variant="filled"
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
