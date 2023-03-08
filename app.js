const express = require('express')
const app = express()
const cors = require('cors')
const port = 4005
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRouter')
const complaintRouter = require('./routes/complaintRouter')
const commentRouter = require('./routes/commentRoutes')
const authRouter = require('./routes/AuthRouter')
const bodyParser = require('body-parser');


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(userRouter)
app.use(postRouter)
app.use(complaintRouter)
app.use(commentRouter)
app.use(authRouter)


app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})
