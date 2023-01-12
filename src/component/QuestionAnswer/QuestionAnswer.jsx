

import React,{useState,useEffect} from "react";
import { Box, Grid, Typography, Modal, Button, Autocomplete, TextField,Select,MenuItem } from "@mui/material";

import dashboardIamge from "../../Assest/Navigation/menu.png";
// import image from "../../Assest/Dashboard/Questinnaire.png";

// import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import { resultDataHead, topicsCellData, topicsDataHead } from "../../utils/fakedata/fakedata";
// import ScrollComponent from "../ScrollComponent/ScrollComponent";
// import backgroundImage from "../../BG.png";
import Swal from "sweetalert2";
import { dropData } from "../../utils/fakedata/fakedata";
import { Form, Field, Formik } from "formik";
import {
  GetTeacherHook,
  GetTopicHook,
  UseCreateTeacherHooks,
  UseCreateTopicHooks,
  GetSingleTopicHook
  
} from "../../utils/CustomQuerHook/CustomQueryHook";
import axios from "axios";
import { motion } from "framer-motion";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import image from "../../Assest/Dashboard/Questinnaire.png";
import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
// import { resultDataHead, topicsCellData} from "../../utils/fakedata/fakedata";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import backgroundImage from "../../BG.png";

const styles = {
  
};
const QuestionAnswer= () => {
  const [openQuestion, setOpenQuestion] = useState(false);
  const [instructor,setInstructor]=useState('');
  const [selectTopicId,setSelectTopicId]=useState('')
  const [seletedTopic,setSelectedTopic]=useState({})
  const [selecttopic,setSelectTopic]=useState('')
  
  const [open, setOpen] = useState({
    openTeacher: false,
    openTopic: false,
  });
  const [dropModalValue, setDropModalValue] = useState("0")
  useEffect(()=>{
    const fetchdata=async()=>{
      const res= await axios.get(`http://localhost:8000/api/topic/${selectTopicId}`);
      setSelectedTopic(res?.data?.data)
    }
    fetchdata()
    
  },[selectTopicId])
  
  const {
    mutate: topicMutate,
    isError: topicError,
    isSuccess: topicSuccess = false,
  } = UseCreateTopicHooks();
  const handleCreateQuestion = () => {
    setOpenQuestion(true);
  };
  const initialValuesTopic = {
    topic: "",
  };
  const handleClose = () => {
    setOpen(false);
    setOpenQuestion(false);
  };
  const handleSubmitTopic = (values) => {
    topicMutate({
      topic: values.topic,
      instructor:instructor,
    });
    if (topicError) {
      return console.log(topicError), setOpen({ openTopic: true });
    }
    setOpen({ openTopic: false });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const topics  = GetTopicHook();
  const handleChangefortopic =(e)=>{
    setSelectTopic(e.target.value)
    setSelectTopicId(e.target.value)
    
      }
  
  return (
    <ScrollComponent>

    <Grid container direction={"column"}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize:"cover",
      minHeight:"100%"
     
    }}
    >
    <HeaderComponent
      headerLabel={"Questionnaires"}
      headerLabelIamges={dashboardIamge}
    />
  
    <Grid container paddingTop={5} paddingBottom={5} paddingLeft={2} paddingRight={2} direction="row" bgcolor={'white'}>
      
    <Typography variant="h6" margin={'30px'} >CREATE QUESTIONS</Typography>
      <Grid item xs={12} lg={12} xl={12} display='flex' justifyContent={"space-between"} px={4} py={5} >
                    <select
                        label="select topic"
                        value={selecttopic}
                        onChange={handleChangefortopic}
                        style={{padding:"10px",textTransform:"capitalize"}}
                      >

                        {
                          topics?.data?.data?.data.map((cur)=>(
                            <option value={cur._id} >{cur.topic}</option>
                          ))
                        }
                      
                      </select>
                      <Typography textTransform={"capitalize"} variant={'h6'}>
                      date <br />

                        {seletedTopic!=={}?seletedTopic?.date:""}
                      </Typography>
                      <Typography textTransform={"capitalize"} variant={'h6'}>
                        generated code <br />

                        {seletedTopic!=={}?seletedTopic?.generatedCode:""}
                      </Typography>
            </Grid>
      <Grid container paddingTop={5} paddingBottom={5} paddingLeft={2} paddingRight={2} direction="row">
      <Grid item xs={12} xl={12}>
      
      <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
         
            <Box sx={{ ...styles }}>
              <Formik
                initialValues={initialValuesTopic}
                // validationSchema={topicSchema}
                onSubmit={(values) => {
                  handleSubmitTopic(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Grid container spacing={5} padding={2}>
                      <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.3 },
                          }}
                          exit={{ opacity: 0 }}
                        >
                          <QuestionComponent
                            setType={"default"}
                            setPrimaryText={"QUESTION1:"}
                            setSecondarytext={"MULTIPLE CHOICE"}
                            setDetails={
                              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                            }
                            dropData={dropData}
                            setDropValue={setDropModalValue}
                          />
                        </motion.div>
                      </Grid>
                      {dropModalValue === "0" ?
                        <>
                          <Grid item lg={6} md={6} xl={6} sx={6} sm={12}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              exit={{ opacity: 0 }}
                            >
                              <QuestionComponent
                                setType={"wrong"}
                                setPrimaryText={" correct answer:"}
                                setSecondarytext={"Wrong"}
                                setDetails={
                                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                                }
                              />
                            </motion.div>
                          </Grid>

                          <Grid item lg={6} md={6} xl={6} sx={6} sm={12}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              exit={{ opacity: 0 }}
                            >
                              <QuestionComponent
                                setType={"wrong"}
                                setPrimaryText={" correct answer:"}
                                setSecondarytext={"Wrong"}
                                setDetails={
                                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                                }
                              />
                            </motion.div>
                          </Grid>

                          <Grid item lg={6} md={6} xl={6} sx={6} sm={12}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              exit={{ opacity: 0 }}
                            >
                              <QuestionComponent
                                setType={"wrong"}
                                setPrimaryText={" correct answer:"}
                                setSecondarytext={"Wrong"}
                                setDetails={
                                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                                }

                              />
                            </motion.div>
                          </Grid>
                          <Grid item lg={6} md={6} xl={6} sx={6} sm={12}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              exit={{ opacity: 0 }}
                            >
                              <QuestionComponent
                                setType={"wrong"}
                                setPrimaryText={" correct answer:"}
                                setSecondarytext={"Wrong"}
                                setDetails={
                                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                                }
                              />
                            </motion.div>
                          </Grid>
                        </> : <>
                          <Grid item lg={12} md={12} xl={12} sx={12} sm={12}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.3 },
                              }}
                              exit={{ opacity: 0 }}
                            >
                              <QuestionComponent
                                setType={"wrong"}
                                setPrimaryText={"correct answer:"}
                                setSecondarytext={"Wrong"}
                                setDetails={
                                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                                }
                              />
                            </motion.div>
                          </Grid>

                        </>}

                    </Grid>
                      <Button type="submit" style={{background:'blue',color:'white'}}>Apply</Button>
                 
                  </Form>
                )}
              </Formik>
            </Box>
          <Grid
            container
            direction={"row"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            gap={5}
            padding={2}
          >

            
             
          
          </Grid>
        </motion.div>
      </Grid>
   
     
     
    </Grid>
    </Grid>
    
  </Grid>
  </ScrollComponent>
   
  )
}

export default QuestionAnswer