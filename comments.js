// Create web server
// Create a new route that listens on /comments
// When a GET request is sent to /comments, the server should respond with the comments array
// When a POST request is sent to /comments, the server should push the body of the request to the comments array
// When a PUT request is sent to /comments, the server should update the comment at the given index with the body of the request
// When a DELETE request is sent to /comments, the server should delete the comment at the given index
// Make sure to send the appropriate status code for each request
// Make sure to send useful error messages

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.put('/comments/:index', (req, res) => {
  const index = req.params.index;
  if (index < comments.length) {
    comments[index] = req.body;
    res.status(200).json(comments[index]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.delete('/comments/:index', (req, res) => {
  const index = req.params.index;
  if (index < comments.length) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});