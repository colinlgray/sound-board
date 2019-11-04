import axios from "axios";
const API_URL = "https://ywd48sesva.execute-api.us-east-1.amazonaws.com/dev";

const api = axios.create({
  baseURL: API_URL
});

export function postSequence(sequence) {
  api
    .post("/sequence", sequence)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error("caught error", error);
    });
}

export function getSequence(id) {
  api
    .get("/sequence", {
      params: {
        ID: id
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error("caught error", error);
    });
}
