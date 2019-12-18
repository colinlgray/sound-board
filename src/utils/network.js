import axios from "axios";
const API_URL = "https://ywd48sesva.execute-api.us-east-1.amazonaws.com/dev";

const api = axios.create({
  baseURL: API_URL
});

export function postSequence(sequence) {
  return api.post("/sequence", sequence).then(res => res.data);
}

export function getSequence(id) {
  return api
    .get(`/sequence/${id}`)
    .then(res => deserializeBoard(res.data.board));
}

export function deserializeBoard(board) {
  return board.map(arr =>
    arr.map(val => {
      if (val.notes.length) {
        return { ...val, clicked: true };
      }
      return val;
    })
  );
}
