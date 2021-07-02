import { apiCall } from "./api";

export const loadStudentsAPI = (data) => {
    let url = `/students/all${constructPaginationQuery(data)}`;
    return apiCall(url, 'GET');
}

export const loadCoursesAPI = (data) => {
    let url = `/courses/all${constructPaginationQuery(data)}`;
    return apiCall(url, 'GET');
}

export const loadStudentByIdAPI = (id) => {
    let url = `/students/one/${id}`;
    return apiCall(url, 'GET');
}

export const loadCourseByIdAPI = (id) => {
    let url = `/courses/one/${id}`;
    return apiCall(url, 'GET');
}

export const updateStudentAPI = (data, id) => {
    let url = `/students/one/${id}`;
    return apiCall(url, 'POST', data);
}


const constructPaginationQuery = (data) => {
    let query = '';
    query += `?limit=${data?.limit !== undefined ? data?.limit : 10}`;
    query += `&skip=${data?.skip !== undefined ? data?.skip : 0}`;
    if (data?.sort) {
        query += `&sort=${JSON.stringify(data?.sort)}`
    }
    if (data?.filter) {
        query += `&filter=${JSON.stringify(data?.filter)}`
    }
    return query;
}