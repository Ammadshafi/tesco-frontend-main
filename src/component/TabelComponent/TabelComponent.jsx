import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Modal,
  Button,
  Typography,
} from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../shared/Modal/Modal";
import {
  DeleteTeacherHook,
  DeleteTopicHook,
 TopicUpdateHooks,
  UseUpdate,
} from "../../utils/CustomQuerHook/CustomQueryHook";
import PaginationAdd from "../pagination/Pagination";

import "./table.css";
import Swal from "sweetalert2";
import { topicSchema } from "../../utils/validationSchema/validationSchema";

const TabelComponent = ({
  cellData,
  pagination,
  tableHead = [],
  tableType,
  buttonFrom,
}) => {
  const [data, setData] = useState([]);
  const [ids, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const[openTopicDelete,setTopicDelete]=useState(false)
  const[openTopicEdit,setTopicEdit]=useState(false)
  const [errors, setError] = useState("");
  const [indexs, setIndex] = useState("");

  const { mutate, isError } = DeleteTeacherHook();
  const{mutate:topicUpdateMutate,isSuccess:topicUpdateSuccess,isError:topicUpdateError}=TopicUpdateHooks()
  const{mutate:topicDeleteMutate,isSuccess:topicDeleteSuccess=false,isError:topicDeleteError}=DeleteTopicHook()
  const {
    isError: editError,
    mutate: editMutate,
    isSuccess: editSuccess,
  } = UseUpdate();

  const handleClose = () => {
    setOpen(false);
   
    setTopicDelete(false)

  };
  const handleOpen = (_id) => {
   setOpen(true)
    setId(_id);
  };
  const handleOpenEdit = (_id, index) => {
    setOpenEdit(true);
    setId(_id);
    setIndex(index);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTopicEdit(false)
  };
  const handleSubmit = () => {
    mutate(ids);
    if (isError) {
      return setError(isError);
    }
    setOpen(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Teacher deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleSubmitTopicEdit=async(values)=>{
    const data={
      id:ids,
      topic:values.topic,
      instructor:values.instructor
    }
    topicUpdateMutate(data)
    setTopicEdit(false)
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }



  const handleSubmitEdit = async (values) => {
    const data = {
      id: ids,
      username: values.userName,
      lastname: values.lastName,
      middlename: values.middleName,
      firstname: values.firstName,
    };
    editMutate(data);
    setOpenEdit(false);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Teacher updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    userName: "",
  };
  const initialValueTopic={
    topic:"",
    instructor:""
  }
  
  useEffect(() => {
    // console.log(indexs,'indexs')
    cellData?.data?.data?.map((each, index) => {
      if (index === indexs) {
       initialValueTopic.instructor=each?.instructor
       initialValueTopic.topic=each?.topic
      
      }
      console.log(indexs)
    });
  }, [indexs, initialValueTopic, cellData]);
  useEffect(() => {
    // console.log(indexs,'indexs')
    cellData?.data?.data?.map((each, index) => {
      if (index === indexs) {
        initialValues.firstName = each?.firstname;
        initialValues.lastName = each?.lastname;
        initialValues.middleName = each?.middlename;

        initialValues.userName = each?.username;
      }
    });
  }, [indexs, initialValues, cellData]);
const handleTopicModal=(_id)=>{
  setTopicDelete(true)
  setId(_id)
}
const handleTopicEditModal=(_id,index)=>{
  setTopicEdit(true)
  setId(_id)
  setIndex(index);
}
const handleTopicDelete=()=>{
  topicDeleteMutate(ids)
  if(topicDeleteError){
    return setError(isError);
  }
  setTopicDelete(false)
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    
  
  
  
    
  
 

}

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
  });
  return (
    <>
      {tableType === "topic" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData &&
                cellData?.data?.data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.generatedCode}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell>{row.instructor}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                      }}
                    >
                      <button
                      onClick={()=> handleTopicEditModal(row._id,index)}
                        style={{
                          color: "white",
                          backgroundColor: "blue",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        edit
                      </button>
                      <button
                        onClick={()=>handleTopicModal(row._id)}
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "teacher" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData &&
                cellData?.data?.data?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.registerDate}</TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                      }}
                    >
                      <button
                        onClick={() => handleOpenEdit(row._id, index)}
                        style={{
                          color: "white",
                          backgroundColor: "blue",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        edit
                      </button>
                      <button
                        onClick={() => handleOpen(row._id)}
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* **modal for delete component** */}
      {
        <ModalComponent open={open}>
          <Typography>Are you sure want to delete?</Typography>
          <Box sx={{ padding: "1em" }}>
            <Button color="warning" onClick={handleSubmit}>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </ModalComponent>
      }
      {
        <ModalComponent open={openTopicDelete}>
          <Typography>Are you sure want to delete?</Typography>
          <Box sx={{ padding: "1em" }}>
            <Button color="warning" onClick={handleTopicDelete}>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </ModalComponent>
      }
      {/* THIS IS TEACHER EDIT MODAL */}
      {
        <ModalComponent open={openEdit} handleClose={handleClose}>
          <Formik
            initialValues={initialValues}
            validationSchema={teacherSchema}
            onSubmit={(values) => {
              handleSubmitEdit(values);
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
                <Typography variant="h6">Update Teacher</Typography>
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

                <Field name="userName" placeholder="username" type="text" />
                {errors.userName && touched.userName ? (
                  <p style={{ fontSize: "1em", color: "red" }}>
                    {errors.userName}
                  </p>
                ) : null}

                <Button type="submit">Update</Button>
                <Button onClick={handleCloseEdit}>Close</Button>
              </Form>
            )}
          </Formik>
        </ModalComponent>
      }
{/* THIS IS TOPIC EDIT MODAL */}
{
        <ModalComponent open={openTopicEdit} handleClose={handleClose}>
          <Formik
            initialValues={initialValueTopic}
            validationSchema={topicSchema}
            onSubmit={(values) => {
              handleSubmitTopicEdit(values);
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
                <Typography variant="h6">Update Topics</Typography>
                      <Field name="topic" placeholder="enter topics" />
                      {errors.topic && touched.topic ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.topic}
                        </p>
                      ) : null}
                       <Field name="instructor" placeholder="enter instructor name" />
                      {errors.instructor && touched.instructor ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.instructor}
                        </p>
                      ) : null}
                      
                

                <Button type="submit">Update</Button>
                <Button onClick={handleCloseEdit}>Close</Button>
              </Form>
            )}
          </Formik>
        </ModalComponent>
      }

      {tableType === "result" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell>{row.instructor}</TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "passer" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map((each) => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell style={{ color: "green" }}>
                      {row.correct}
                    </TableCell>
                    <TableCell style={{ color: "red" }}>{row.wrong}</TableCell>
                    <TableCell
                      style={{ color: "blue" }}
                    >{`${row.result}%`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {pagination && (
        <Box
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          margin="2em 0em"
        >
          <PaginationAdd
            setProducts={(e) => setData(e)}
            rawData={cellData?.data?.data}
          />
        </Box>
      )}
    </>
  );
};

export default TabelComponent;
