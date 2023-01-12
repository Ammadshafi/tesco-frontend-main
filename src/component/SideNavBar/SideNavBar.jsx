import { Grid, Paper, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import image from "../../Assest/Navigation/sidebar.png";
import ImageWIthLabel from "../../shared/ImageWithLabel/ImageWIthLabel";
import logo from "../../Assest/Navigation/title.png";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { sideNavData } from "../../utils/sideNavData/sideNavData";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import { motion } from "framer-motion";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

import { useNavigate } from "react-router-dom";
import "./sidenavbar.css";
import { useRef,useEffect} from "react";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import SideScroll from "../ScrollComponent/SideScroll";
const SideNavBar = ({
  parameters,
  role,
  sideNavData = [],
  subType,
  setTigger,
  children,
  setUser
}) => {
  const history = useNavigate();
  const handleLogout = () => {
    history("/");
    setUser("")
  };
  const [isOpen, setOpen] = useState(true);
  const styles = {
    paperContiner: {
      backgroundImage: isOpen ? `url(${image})` : null,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width:isOpen?"20em":"0em"
      
    },
  };

  const open = () => {
    setOpen(true);
    setRotaion(rotation + 180);
  };
  const close = () => {
    setOpen(false);
    setRotaion(rotation - 180);
  };

  const [rotation, setRotaion] = useState(0);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });
  return (
    <div className="side-bar-style-container-active" style={{postion:"relative"}} >
      <motion.div animate={{ width: isOpen ? "20em" : "0px",transition:{duration:0.2}}}  >
        <Paper style={styles.paperContiner} className="paper-side-bar" ref={menuRef} >
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems={"center"}
            borderBottom={isOpen ? "1px solid white" : ""}
          >
            <Grid
              container
              padding={5}
              direction={"row"}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
             
            >
                 <Grid item  zIndex={2}>
                <motion.div
                  animate={{ rotate: rotation }}
                  onClick={() => (isOpen ? close() : open())}
                >
                  <button
                    onClick={""}
                    style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      

                      //     border:"none",
                      //   cursor:"pointer",
                      // borderRadius:"50%",
                      boxShadow:"rgb(79, 78, 78) 0px 0px 0px 3px"
                    }}
                  >
                    <FormatAlignRightIcon
                      fontSize="small"
                      sx={{
                        color: "rgb(79, 78, 78)",
                      }}
                    />
                  </button>
                </motion.div>
              </Grid>
              {isOpen && (
                <Grid item>
                  <img
                    src={logo}
                    alt=""
                    className="iamge-logonavbar"
                    style={{ width: "10em" }}
                  />
                </Grid>
              )}

           
            </Grid>
            {isOpen && (
              <Grid item>
                <Typography variant="h6" fontWeight={"700"} color={"white"} >
                  {role}
                </Typography>
              </Grid>
            )}
          </Grid>
          {isOpen && (
            <Grid container
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
               
              }}
            >
              <SideScroll >
              {sideNavData.map((each, index) => (
                <Grid item sx={{ marginTop: "2em", padding: "0em 1em" }} key={index}>
                  <ImageWIthLabel
                    setImage={each.image}
                    setpath={each.values}
                    labelVariant={"h6"}
                    setLabel={each.label}
                    setIcon={each.icon}
                    subType={subType}
                    parameters={parameters}
                    setDrop={each.type}
                    
                    
                  />
                </Grid>
              ))}
           
          
               <Grid Item
              display={"flex"}
              marginTop="4em"
              marginBottom={"4em"}
              justifyContent={"center"}
              
            >
              <ButtonLabel
                buttonLabel={"Logout"}
                handleCLick={handleLogout}
                styles={{
                  fontSize: "1.2em",
                  width: "10em",
                  backgroundColor: "#ebad00",
                  color: "black",
                }}
              />
            </Grid>
            </SideScroll>
            </Grid>
          )}
            {/* {isOpen && (
           
          )}
         */}
        </Paper>
      </motion.div>

      <main className="main-child-container">{children}</main>
    </div>
  );
};

export default SideNavBar;
