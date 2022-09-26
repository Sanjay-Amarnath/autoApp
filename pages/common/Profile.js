import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import withAuth from "../../projectHelper/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { userDataState } from "../../redux/activitySlice";
import moment from "moment";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Input from "@mui/material/Input";
import {
  db,
  getAllFirebaseUserInfo,
  getFirebaseAuth,
  updateUserProfile,
} from "../../firebase/authProvider";

const ProfilePage = () => {
  const { profileInfo } = useSelector(userDataState);
  const storage = getStorage();

  const dispatch = useDispatch();

  const [updateInfo, setUpdateInfo] = useState({});
  const [update, setupdate] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  //UserInfo destructure

  useEffect(() => {
    dispatch(getFirebaseAuth());
    setAllData(
      userDetails.map((i) => ({
        id: i.id,
        data: i.data(),
      }))
    );
  }, [update]);

  // testing uploadImg...

  const [percent, setPercent] = useState("0");
  const [uploadImg, setUploadImg] = useState("");
  const [loader, setLoader] = useState("");

  const uploadFile = (e) => {
    setLoader("");
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `/userProfile/${profileInfo?.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUploadImg(url);
            setLoader(url);
          });
        }
      );
    }
  };

  const { userDetails } = useSelector(userDataState);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    dispatch(getAllFirebaseUserInfo());
  }, []);


  const updateFile = () => {
    const userData = allData.filter((i) => {
      return i.data.uid === profileInfo.uid;
    });

    const { id } = userData.find((i) => {
      return i.id;
    });


    setIsLoading(true);
    if (!isloading) {
      setupdate(false);
    }
    updateUserProfile(updateInfo.name, uploadImg, setIsLoading, id);
  };


  return (
    <>
      <Navbar />
      <div className={"mt-[20%] flex items-center justify-center"}>
        <div
          className={
            "bg-white rounded max-w-[500px] w-[500px] p-5 grid md:grid-cols-4 gap-4 sm:grid-cols-1"
          }
        >
          {update ? (
            <>
              <div className={"content-center m-auto relative"}>
                <img
                  src={
                    uploadImg !== ""
                      ? uploadImg
                      : profileInfo?.photoURL ??
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  className={"rounded"}
                  alt={"profile"}
                />
                {loader === "" && (
                  <>
                    <CircularProgress
                      variant="determinate"
                      value={percent}
                      style={{
                        position: "absolute",
                        bottom: "30%",
                        right: "30%",
                      }}
                      label={percent}
                    >
                      {percent}
                    </CircularProgress>
                    <p></p>
                  </>
                )}
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  style={{ position: "absolute", bottom: "0", right: "0" }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={uploadFile}
                  />
                  <PhotoCamera />
                </IconButton>
              </div>
              <div className={" col-span-3"}>
                <h1 className={"capitalize text-xl"}>
                  {profileInfo?.displayName}
                </h1>
                <h1 className={"text-xs font-normal"}>{profileInfo?.email}</h1>
                <div className={"bg-slate-200 text-sm rounded p-2 my-2"}>
                  <p className={"capitalize text-sm "}>Enter your username</p>
                  <Input
                    Placeholder={"UserName"}
                    onChange={({ target }) => {
                      setUpdateInfo((prev) => ({
                        ...prev,
                        name: target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="col-span-4 m-auto">
                <Button
                  variant={"contained"}
                  style={{
                    backgroundColor: "rgb(31 41 55 / var(--tw-bg-opacity))",
                    textTransform: "capitalize",
                  }}
                  className={"hi"}
                  onClick={updateFile}
                  size="small"
                >
                  Done <TaskAltIcon style={{ fontSize: "15px" }} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={"content-center m-auto"}>
                <img
                  src={
                    uploadImg !== ""
                      ? uploadImg
                      : profileInfo?.photoURL ??
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  className={"rounded"}
                  alt={"profile"}
                />
              </div>
              <div className={" col-span-3"}>
                <h1 className={"capitalize text-xl"}>
                  {profileInfo?.displayName}
                </h1>
                <h1 className={"text-xs font-normal"}>{profileInfo?.email}</h1>
                <div className={"bg-slate-200 text-sm rounded p-2 my-2"}>
                  <p
                    className={
                      "capitalize text-sm underline underline-offset-1"
                    }
                  >
                    Created at
                  </p>
                  <h1>
                    {moment(profileInfo?.metadata?.creationTime).format(
                      "MMMM Do YYYY"
                    )}
                  </h1>
                  <p className="text-xs font-normal">
                    {moment(profileInfo?.metadata?.creationTime).format(
                      "h:mm:ss a"
                    )}
                  </p>
                </div>
              </div>

              <div className="col-span-4 m-auto">
                <Button
                  variant={"contained"}
                  style={{
                    backgroundColor: "rgb(31 41 55 / var(--tw-bg-opacity))",
                    textTransform: "capitalize",
                  }}
                  className={"hi"}
                  onClick={() => {
                    setupdate(true);
                  }}
                  size="small"
                >
                  Update
                  <SettingsIcon style={{ fontSize: "15px" }} />{" "}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(ProfilePage);
