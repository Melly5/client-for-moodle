import axios from "axios";

const API_URL = `https://dev.online.tusur.ru/moodle/webservice/rest`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

const token = "2b8e54a638f0422b6859f223fa0a086e";

export const API = `/server.php?wstoken=${token}&moodlewsrestformat=json&wsfunction=`;
