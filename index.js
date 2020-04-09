require('dotenv').config();
const express = require('express');
const cors = require('cors')
const postRouter = require('./posts/router.js')
const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors())
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`
    <p>Welcome to the Lambda Posts API</p>
  `);
});


server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
