import axios from "axios";
import { Snackbar } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {endpoints } from "../endpoints/endpoints";

const createTeacher = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}${endpoints.createTeacher}`, data);
};
const getTeacher = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}${endpoints.getTeacher}`);
};
const deleteTeacher = async (data) => {
  return await axios.delete(`${process.env.REACT_APP_BASE_URL}${endpoints.deleteTeacher}/${data}`);
};
const editTeacher=async(body)=>{
  const response= await axios.put(`http://localhost:5000/api/teacher`,body)
  return response.data
}
const getSingleTeacher = async (data) => {
  return await axios.get(`http://localhost:8000/api/teacher/${data}`);
};



const createTopic=async(data)=>{

  return await axios.post(`${process.env.REACT_APP_BASE_URL}${endpoints.createTopic}`,data)
}
const getSingleTopic = async (data) => {
  return await axios.get(`http://localhost:8000/api/topic/${data}`);
};
const getTopic=async()=>{
  return await axios.get(`${process.env.REACT_APP_BASE_URL}${endpoints.getAllTopic}`);
}
const deleteTopic=async(data)=>{
  return await axios.delete(`${process.env.REACT_APP_BASE_URL}${endpoints.deleteTopic}/${data}`);

}






export const UseCreateTopicHooks=()=>{
  const queryClient = useQueryClient();
  return useMutation(createTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries("topic-data");
    },
  });
}
export const GetTopicHook = (onSuccess, onError) => {
  return useQuery("topic-data", getTopic, {
    onSuccess,
    onError,
  });
};
export const DeleteTopicHook = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries("topic-data");
    },
    onError: ({ message }) => {
      setDeletionError(message);
    },
  });
};
export const TopicUpdateHooks=()=>{
  return useMutation(
    (variables) => {
      return axios.put('http://localhost:8000/api/update-topic', variables);
    }
  );
}




export const UseCreateTeacherHooks = () => {
  const queryClient = useQueryClient();
  return useMutation(createTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
  });
};
export const GetTeacherHook = (onSuccess, onError) => {
  return useQuery("teacher-data", getTeacher, {
    onSuccess,
    onError,
  });
};

export const DeleteTeacherHook = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
    onError: ({ message }) => {
      setDeletionError(message);
    },
  });
};
export const UpdateTeacherHook = () => {
  const queryClient = useQueryClient();
  return useMutation(editTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
    onError: ({ message }) => {},
  });
};
export const UseUpdate=()=>{
  return useMutation(
    (variables) => {
      return axios.put('http://localhost:8000/api/teacher', variables);
    }
  );
}
export const GetSingleTeacherHook = (onSuccess, onError) => {
  return useQuery("teacher-single-data", getSingleTeacher, {
    onSuccess,
    onError,
  });
};
export const GetSingleTopicHook = (onSuccess, onError) => {
  return useQuery("topic-single-data", getSingleTopic, {
    onSuccess,
    onError,
  });
}
