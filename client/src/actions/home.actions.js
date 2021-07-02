import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadCoursesAPI, loadStudentByIdAPI, loadStudentsAPI, updateStudentAPI } from "../services/home.api";

export const loadStudentsAction = createAsyncThunk(
    'home/students/get',
    async (data) => {
        const response = await loadStudentsAPI(data);
        return response;
    }
);

export const loadCoursesAction = createAsyncThunk(
    'home/courses/get',
    async (data) => {
        const response = await loadCoursesAPI(data);
        return response;
    }
);

export const loadStudentsByIdAction = createAsyncThunk(
    'home/student/get/id',
    async (data) => {
        const response = await loadStudentByIdAPI(data);
        return response;
    }
);

export const loadCoursesByIdAction = createAsyncThunk(
    'home/course/get/id',
    async (data) => {
        const response = await loadCoursesByIdAction(data);
        return response;
    }
);

export const updateStudentAction = createAsyncThunk(
    'home/course/get/id',
    async (props) => {
        const { data, id } = props;
        const response = await updateStudentAPI({ course: data }, id);
        return response;
    }
);