"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLogState } from "@/store/logSlice";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const credentials = { name: "sowmya", password: "12345" };
import { useSession } from "next-auth/react";
import { hasCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    errNameText: false,
    password: "",
    errPwdText: false,
  });
  // const [password,setPassword]= useState({});
  const { data: session, status } = useSession();
  console.log("cookie", hasCookie("next-auth.session-token"));
  if (status === "authenticated" && session) {
    router.push("/");
  }

  const submitLogs = async (e) => {
    e.preventDefault();
    console.log(
      credentials.name,
      userDetails.name,
      credentials.password,
      userDetails.password
    );
    // if(credentials.name===userDetails.name && credentials.password===userDetails.password){
    //     localStorage.setItem("logstate","true");
    //     dispatch(updateLogState(true));
    //     router.replace("/home")
    // }else{
    //   // dispatch(updateLogState(false));
    //   // localStorage.setItem("logstate","false");

    // }

    event.preventDefault();
    let username = userDetails.name;
    let password = userDetails.password;
    // Call the signIn function to authenticate the user using the provided credentials
    let res = await signIn("credentials", {
      username,
      password,
      redirect: true, // Do not redirect, handle the result manually for false
      callbackUrl: "/",
    });
    console.log(res, "res");
    // .then((result) => {
    //   console.log(result,"lllllll")
    //   if (result.error) {
    //     // Handle authentication error
    //     console.log('Authentication failed:', result.error);
    //   } else {
    //     // Authentication succeeded, redirect to a protected page
    //     // router.push('/dashboard');
    //   }
    // });
  };

  const onChangeUseDetails = (e) => {
    console.log(e.target, "target", e.target.id === "username");
    let errorCheck = e.target.value.trim("");

    if (e.target.id === "username") {
      setUserDetails((prev) => {
        return {
          ...prev,
          name: e.target.value,
          errNameText: errorCheck.length > 0 ? false : true,
        };
      });
    } else {
      setUserDetails((prev) => {
        return {
          ...prev,
          password: e.target.value,
          errPwdText: errorCheck.length > 0 ? false : true,
        };
      });
    }
  };

  return (
    <div className={styles.center}>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Login Page
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitLogs}
          >
            <div>
              <TextField
                id="username"
                label="Username"
                value={userDetails.name}
                error={userDetails.errNameText}
                helperText={
                  userDetails.errNameText ? "Username is required" : ""
                }
                fullWidth
                variant="outlined"
                type="text"
                required
                onChange={onChangeUseDetails}
              />
              <br />
              <TextField
                id="password"
                label="Password"
                value={userDetails.password}
                error={userDetails.errNameText}
                helperText={
                  userDetails.errNameText ? "Username is required" : ""
                }
                fullWidth
                variant="outlined"
                type="password"
                required
                onChange={onChangeUseDetails}
              />
            </div>
            <Button type="submit" size="small">
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
