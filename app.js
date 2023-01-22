const express = require('express')
const app = express()
const cors = require('cors')
const port = 4005
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const commentsRouter = require('./routes/commentsRoutes')
const io = require('socket.io')(3000,{
  cors:{
    origin:['http://localhost:8080'],
    methods: ["GET", "POST"]
  },
  })

io.on('connection', socket =>{
  
  console.log(socket.id)
  socket.on(`custom-event`, 10, "HI")
})

app.use(express.json())
app.use(cors())

app.use(commentsRouter)
app.use(postRouter)
app.use(userRouter)

app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})
