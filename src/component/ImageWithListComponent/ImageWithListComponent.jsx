import React, { useEffect, useState } from "react";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import searchIcon from "../../Assest/Topic/SearchBtn.png";
import { Box, Grid, Typography, Modal, Button, Autocomplete, TextField,Select,MenuItem } from "@mui/material";
import DataTable from "../TabelComponent/TabelComponent";
import "./imagewithlist.css";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import InputLabel from "../../shared/InputLabel/InputLabel";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import { Form, Field, Formik } from "formik";
import { MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  GetTeacherHook,
  GetTopicHook,
  UseCreateTeacherHooks,
  UseCreateTopicHooks,
  GetSingleTopicHook
  
} from "../../utils/CustomQuerHook/CustomQueryHook";
import CircularIndeterminate from "../../shared/Spinner/Spinner";
import Swal from "sweetalert2";
import { topicSchema } from "../../utils/validationSchema/validationSchema";
import { dropData } from "../../utils/fakedata/fakedata";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const teacherSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  // middleName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  userName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  password: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
});

const ImageWithListComponent = ({
  tableType,
  questionType = "table",
  searchType = true,
  setImage,
  labelList,
  buttonLabel,
  tableHead,
  cellData,
  optionType = false,
  setting = false,
  setType,
  settingPlaceholder1,
  settingPlaceholder2,
  settingPlaceholder3,
  isLoading,

  pagination = true,
  buttonFrom = "teacher",
}) => {
  const [s,sets]=useState('')
  const [e,sete]=useState('')
  const [selectTopicId,setSelectTopicId]=useState('')
  const [open, setOpen] = useState({
    openTeacher: false,
    openTopic: false,
  });
  const [error, setError] = useState("");
  const [dropValue, setDropValue] = useState("0")
  const [dropModalValue, setDropModalValue] = useState("0")
const [seletedTopic,setSelectedTopic]=useState({})
  useEffect(()=>{
    const fetchdata=async()=>{
      const res= await axios.get(`http://localhost:8000/api/topic/${selectTopicId}`);
      // console.log(res)
      setSelectedTopic(res?.data?.data)
    }
      fetchdata()
    
  },[selectTopicId])
  const [openQuestion, setOpenQuestion] = useState(false);
  const teacher = GetTeacherHook()
  const topics  = GetTopicHook()
  const selectedTopic = GetSingleTopicHook(selectTopicId)
  

  const optionsforauto = teacher?.data?.data.data.map((cur) => (cur.firstname))
  const optionsfortopics = topics?.data?.data.data.map((cur) => ({value:cur.topic,id:cur._id}))

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    userName: "",
    password: "",
  };
  const initialValuesTopic = {
    topic: "",
  };
  
  

  const handleOpen = () => {
    buttonFrom === "teacher" && setOpen({ openTeacher: true });
    buttonFrom === "topic" && setOpen({ openTopic: true });
  };
  const handleCreateQuestion = () => {
    setOpenQuestion(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenQuestion(false);
  };
  




  const {
    mutate,
    isLoading: Loading,
    isError,
    isSuccess: teacherSuccess,
  } = UseCreateTeacherHooks();
  const {
    mutate: topicMutate,
    isError: topicError,
    isSuccess: topicSuccess = false,
  } = UseCreateTopicHooks();


const handleChange=(e)=>{
  sets(e.target.value)
  console.log(e.target.value)
}
  const handleSubmit = (values) => {
    // setFormData({
    //   username:values.userName,
    //   middlename:values.middleName,
    //   firstname:values.firstName,
    //   lastname:values.lastName,
    //   password:values.password
    //  })

    mutate({
      username: values.userName,
      password: values.password,
      lastname: values.lastName,
      firstname: values.firstName,
      middlename: values.middleName,
    });
    if (isError) {
      return setError(isError);
    }
    setOpen(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Teacher created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleSubmitTopic = (values) => {
    topicMutate({
      topic: values.topic,
      instructor:s,
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
  const handleChangefortopic =(e)=>{
sete(e.target.value)
setSelectTopicId(e.target.value)

  }
  console.log(seletedTopic)

  return (
    <Box className="Image-with-list-container">
      <Box className="image-with-list-main">
        <Box className="image-container">
          <motion.div animate={{ rotate: -360, transition: { duration: 0.3 } }}>
            <figure>
              <img src={setImage} alt="" className="image-list" />
            </figure>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              sx={{ marginLeft: "0.3em" }}
              variant="h6"
              color={"grey"}
            >
              {labelList}
            </Typography>
          </motion.div>
        </Box>
        {searchType && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
          >
            <Box
              display={"flex"}
              alignItems="center"
              gap={1}
              paddingLeft={"2em"}
              className="setting-type-container"
              paddingRight={"1em"}
            >
              {/* <Typography
              color={"grey"}
              variant="h5"
              className="search-typo-text"
            >
              Search
            </Typography> */}
              <MDBInputGroup
                className="mb-3"
                noBorder
                textBefore={"Search"}
                textAfter={<MDBIcon fas icon="search" />}
              >
                <input type={"text"} className="form-control" />
              </MDBInputGroup>
            </Box>
          </motion.div>
        )}
        {optionType === "none" && (
          <Box padding={3}>
            <ButtonLabel
              buttonLabel={buttonLabel}
              handleCLick={handleOpen}
              setSize="medium"
              styles={{
                fontSize: "1.2em",
                width: "15em",
                backgroundColor: "#ebad00",
                color: "white",
              }}
            />
            <Modal
              hideBackdrop
              open={open.openTeacher}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={teacherSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
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
                      <Typography variant="h6">Add Teacher</Typography>
                      <Field name="firstName" placeholder="firstname" />
                      {errors.firstName && touched.firstName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.firstName}
                        </p>
                      ) : null}
                      <Field name="middleName" placeholder="middlename" />
                      {errors.middleName && touched.middleName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.middleName}
                        </p>
                      ) : null}
                      <Field name="lastName" placeholder="lastname" />
                      {errors.lastName && touched.lastName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.lastName}
                        </p>
                      ) : null}

                      <Field
                        name="userName"
                        placeholder="username"
                        type="text"
                      />
                      {errors.userName && touched.userName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.userName}
                        </p>
                      ) : null}
                      <Field
                        name="password"
                        type="password"
                        placeholder="password"
                      />
                      {errors.password && touched.password ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.password}
                        </p>
                      ) : null}

                      <Button type="submit">Apply</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
            <Modal
              hideBackdrop
              open={open.openTopic}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style }}>
                <Formik
                  initialValues={initialValuesTopic}
                  validationSchema={topicSchema}
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
                      <Typography variant="h6">Add Topics</Typography>
                      <Field name="topic" placeholder="enter topics" style={{padding:'10px'}} />
                      {errors.topic && touched.topic ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.topic}
                        </p>
                      ) : null}
                      <select
                        label="select instructer"
                        name="instructor"
                        value={s}
                        onChange={handleChange}
                        style={{padding:'10px'}}
                      >
                        {
                          teacher?.data?.data?.data.map((cur)=>(
                            <option  value={cur.firstName}>{cur.firstname}</option>
                          ))
                        }
                      
                      </select>

                      {errors.instructor && touched.instructor ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.instructor}
                        </p>
                      ) : null}

                      <Button type="submit">Apply</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </Box>
        )}
      </Box>
      
      {questionType === "table" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", padding: "1em" }}
            >
              <CircularIndeterminate />
            </Box>
          ) : (
            <Box padding={2}>
              <DataTable
                cellData={cellData}
                tableHead={tableHead}
                tableType={tableType}
                pagination={pagination}
                buttonFrom={buttonFrom}
              />
            </Box>
          )}
        </motion.div>
      )}
      {questionType === "question-choice" && (
        // <ScrollComponent styles={{  padding: "1em" }}>

        <Grid container spacing={5} padding={2}>
          <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
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
                setDropValue={setDropValue}

              />
            </motion.div>
          </Grid>
          {dropValue === "0" ?
            <>
              <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"correct"}
                    setPrimaryText={"CHOICE 1:"}
                    setSecondarytext={"Correct"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>

              <Grid item lg={6} md={12} xl={6} sm={12} sx={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 2:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>

              <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 3:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>
              <Grid item lg={6} md={12} xl={6} sx={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 4:"}
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
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 4:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>
            </>}

        </Grid>

        // </ScrollComponent>
      )}
      {questionType === "question-answer" && (
        <Grid container spacing={5} padding={2}>
          {/* <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
              <QuestionComponent
              setType={"default"}
              setPrimaryText={"QUESTION1:"}
             
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
              dropData={dropData}
              setDropValue={setDropValue}
              
            />
              </motion.div>
          
          </Grid> */}
          {/* MULTIPLE CHOICE CONTAINER */}
          {
            //   dropValue==="0"?
            //   <>
            //    <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            //    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>

            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            //   </>
            //   :
            //   <>
            //    <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
            //    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>

            //   </>

          }



        </Grid>
      )}
      {setting && (
        <Grid padding={2} container spacing={5} className="setting-grid">
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder1}
            />
          </Grid>
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder2}
            />
          </Grid>
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder3}
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            padding={2}
            marginLeft="auto"
          >
            <ButtonLabel
              buttonLabel="Save"
              styles={{
                fontSize: "1.2em",
                width: "15em",
                backgroundColor: "rgb(68, 68, 242)",
                color: "white",
              }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ImageWithListComponent;
