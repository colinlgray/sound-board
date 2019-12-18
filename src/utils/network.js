import axios from "axios";
// const DEV_API_URL = "http://localhost:3001";
const API_URL = "https://ywd48sesva.execute-api.us-east-1.amazonaws.com/dev";

const api = axios.create({
  baseURL: API_URL
});

export function postSequence(sequence) {
  return api.post("/sequence", sequence);
}

export function getSequence(id) {
  return api.get(`/sequence/${id}`);
}
