"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store/storeConfig";
import { useSelector } from "react-redux";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { useSession } from "next-auth/react";
import { useEffect,useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from "@mui/material";
import {  signOut } from "next-auth/react"

export function ProtectedRoute({ children }) {
  // const persistor = persistStore(store);
  let cond = false;
  // let state = useSelector((state) => state);
  let nav = useRouter();
  const {data:session,status} = useSession();
  const navi = useRouter()
  // console.log(status,"session",session);
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      console.log(status,"the session condition",!session)
      navi.replace("/login");
    }
  }, [session,status])
  


  const drawerWidth = 240;

  const NavB = () => {
        if( status==="unauthenticated" ){
          return  (<> {children}</>)
        }
        if((status==="loading" && session===undefined)){
              return <p>Loading...</p>
        }

        if(status==="authenticated" && session){
          //React.Children.map(children, (child) => {
          //   if (React.isValidElement(child)) {
          //     if (isLoginComponent(child)) {
          //       // Child component is the login component
          //       console.log("Login component");
          //       // return <p>Loading...</p>
          //     } else {
          //       console.log("not Login component");

          //       // Child component is not the login component
          //     }
          //   }
          // });
               return   (<Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                  }}
                >
                  <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                      Permanent drawer
                      <Button style={{color:'#fff'}} onClick={()=>signOut()}><ExitToAppIcon color="disabled"/> Signout</Button>
                    </Typography>
                    {/* <nav>
        
                    </nav> */}
                  </Toolbar>
                </AppBar>
                <Drawer
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                    },
                  }}
                  variant="permanent"
                  anchor="left"
                >
                  <Toolbar />
                  <Divider />
        
                  <List>
                    {[{ text: "Home",link:'home', compo: <HomeIcon /> },{text:'About',link:'about',compo:<InfoIcon  />}].map((each, index) => (
                    <Link href={`/${each.link}`} key={each.text}>
                      <ListItem key={each.text} disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                  {each.compo}
                              </ListItemIcon>
                              <ListItemText primary={each.text} />
                            </ListItemButton>
                          </ListItem>
                      </Link>
                    ))}
                  </List>
                </Drawer>
                <Box
                  component="main"
                  sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
                >
                  <Toolbar />
                  {children}
                </Box>
              </Box>)
        }
      }
    
  

  // const CompoDisplay = () => {
  //   if(status==="loading" && session===undefined){
  //       return <p>Loading.....</p>
  //   }
  //   if(status==="unauthenticated" && session===null){
  //     navi.replace("/login");

  //         return <></>
  //   }
  //   if(status==="authenticated" && session){
  //       return <NavB />
  //   }
  // }

  return <> <NavB /></>;
}


//loading and undefined ===== loading
//loading and unauthenticated ===== replace to login
//authenticated and object ===== NavB