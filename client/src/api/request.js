import Axios from 'axios';

const axios = () => {
  const config = {
    baseURL: 'https://iotdashboardapi.azurewebsites.net/api/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return Axios.create(config);
};

const request = async ({ urlSlug, method = 'GET' }) => {
  const axiosInstance = axios();

  const { data } = await axiosInstance.request(urlSlug, { method });

  return data
};

export const getHistoricalValues = ({ fromDate, toDate, kpi }) => {
  return request({
    urlSlug: `historicValues/MyPythonDevice?periodStart=${fromDate}&periodEnd=${toDate}&kpi=${kpi}&code=hULZ7TpOh5BikenAgJWaEQ0gIhmzQY8qwlld/hwaP2nBN1pmimWzsw==`,
  });
};

export const getCurrentValues = () => {
  return request({
    urlSlug: `currentValues/MyPythonDevice?code=4ygRvGn3nZREhaMdlH8aOquESITPkVe/Wm6UglNGofqdULAPb8mVSw==`,
  });
};
