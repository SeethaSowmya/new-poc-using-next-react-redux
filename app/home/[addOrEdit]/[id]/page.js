"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

const EditPost = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const reducer = (state, action) => {
    let inputErr =
      action.value == undefined
        ? ""
        : typeof(action.value) === 'number' ? false:action.value.trim().length > 0
        ? false
        : true;
    let copystate = [...state];
    //we can filter particuler one by filtering with id
    switch (action.type) {
      case "title":
        copystate[0] = {
          ...copystate[0],
          value: action.value,
          errorState: inputErr,
        };
        return copystate;
      case "body":
        copystate[1] = {
          ...copystate[1],
          value: action.value,
          errorState: inputErr,
        };
        return copystate;
      case "userId":
        copystate[2] = {
          ...copystate[2],
          value: action.value,
          errorState: inputErr,
        };
        return copystate;
      case "update":
        let chdata = action.maindata;
        let some = state.map((item, index) => {
          console.log(chdata, "chchchch");
          if (item.id === "title") {
            return { ...item, value: chdata.title };
          }
          if (item.id === "body") {
            return { ...item, value: chdata.body };
          }
          if (item.id === "userId") {
            return { ...item, value: chdata.userId };
          }
        });
        return some;

      default:
        return [];
    }
  };

  const initialData = [
    { value: "", errorState: false, id: "title" },
    { value: "", errorState: false, id: "body" },
    { value: 0, errorState: false, id: "userId" },
  ];

  const [state, dispatcher] = useReducer(reducer, initialData);

  const onChangeItem = (event, id) => {
      dispatcher({ type: id, value: event.target.value });
  };
  const storedData = useSelector((state) => state.postData.postdata);
  console.log(storedData, "storedData");
  const ids = storedData.map((each) => each.userId);
  const uniqueIds = new Set(ids);
  const uniqueValues = Array.from(uniqueIds);

  useEffect(() => {
    const getPostData = async () => {
      let maindata = (
        await axios(
          `https://jsonplaceholder.typicode.com/posts/${pathname.split("/")[3]}`
        )
      ).data;
      console.log(maindata, "gggggggggggggggg");
      dispatcher({ type: "update", maindata });
    };
    if(pathname.split("/")[2]!=='add'){
      getPostData();
    }
  }, []);

  const submitFunc = async (e) => {
    e.preventDefault();
    let payload = {
      title: state[0].value,
      body: state[1].value,
      userId: state[2].value,
    };
    if (pathname.split("/")[2] == "add") {
      let resp = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
    } else {
      let param2 = Number(pathname.split("/")[3]);
      let respUpdated = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${param2}`,
        payload
      );
    }
    navigate.replace("/home");
  };
  return (
    <div>
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
            onSubmit={submitFunc}
          >
            <div>
              <TextField
                required
                variant="outlined"
                margin="normal"
                id={state[0].id}
                value={state[0].value}
                error={state[0].errorState}
                label={state[0].id}
                type="text"
                name={state[0].id}
                autoFocus
                helperText={state[0].errorState ? "title is required" : ""}
                onChange={(event) => {
                  onChangeItem(event, state[0].id);
                }}
                defaultValue="Hello World"
              />
              <br />
              <TextField
                required
                variant="outlined"
                margin="normal"
                id={state[1].id}
                value={state[1].value}
                error={state[1].errorState}
                label={state[1].id}
                type="text"
                width={100}
                name={state[1].id}
                autoFocus
                helperText={state[1].errorState ? "body is required" : ""}
                onChange={(event) => {
                  onChangeItem(event, state[1].id);
                }}
              />
              <br />
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={state[2].value}
                onChange={(event) => {
                  onChangeItem(event, state[2].id);
                }}
              >
                {uniqueValues.map((id) => (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                ))}
              </TextField>
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

export default EditPost;
