const connectToDatabase = require("./db");
const NoteSequence = require("./models/NoteSequence");
require("dotenv").config({ path: "./variables.env" });

const baseSuccessResponse = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  },
  statusCode: 200
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    NoteSequence.create({ board: JSON.parse(event.body) })
      .then(sequence => {
        callback(null, {
          ...baseSuccessResponse,
          body: JSON.stringify(sequence)
        });
      })
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the note."
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    NoteSequence.findById(event.pathParameters.id)
      .then(note =>
        callback(null, {
          ...baseSuccessResponse,
          body: JSON.stringify(note)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the note."
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    NoteSequence.find()
      .then(notes =>
        callback(null, {
          ...baseSuccessResponse,
          body: JSON.stringify(notes)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    NoteSequence.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true
      }
    )
      .then(note =>
        callback(null, {
          ...baseSuccessResponse,
          body: JSON.stringify(note)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};

module.exports.del = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    NoteSequence.findByIdAndRemove(event.pathParameters.id)
      .then(note =>
        callback(null, {
          ...baseSuccessResponse,
          body: JSON.stringify({
            message: "Removed note with id: " + note._id,
            note: note
          })
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the notes."
        })
      );
  });
};
