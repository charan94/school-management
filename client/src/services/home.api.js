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
    query += `?limit=${data?.limit ? data?.limit : 0}`;
    query += `&offset=${data?.offset ? data?.offset : 0}`;
    if (data?.sort) {
        query += `&sort=${JSON.stringify(data?.sort)}`
    }
    if (data?.filter) {
        query += `&sort=${JSON.stringify(data?.filter)}`
    }
    return query;
}