import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = `https://dev.online.tusur.ru/moodle/webservice/rest`;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [],
  endpoints: () => ({}),
});
