const BASE_API_URL = `${process.env.REACT_APP_API_URL}`;

export const apiCall = async (
    url,
    method,
    data,
    headers
) => {
    const authToken = localStorage.getItem('x-auth-token');
    const newHeaders = authToken ? new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        ...headers
    }) : new Headers({
        'Content-Type': 'application/json',
        ...headers
    });

    const config = {
        method,
        headers: newHeaders,
        body: data && JSON.stringify(data)
    };

    const result = await fetch(`${BASE_API_URL}${url}`, config);

    if (result.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
    }

    if (result.status === 403) {
        window.location.href = '/home';
    }

    if (!result.ok) {
        try {
            const body = await result.json();
            return body;
        } catch (_error) {
            throw new Error(_error);
        }
    }

    return result.json();
};


