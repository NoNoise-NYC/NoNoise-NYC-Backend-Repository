const express = require('express')
const app = express()
const cors = require('cors')
const port = 4005
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRouter')
const complaintRouter = require('./routes/complaintRouter')
const commentRouter = require('./routes/commentRoutes')

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(postRouter)
app.use(complaintRouter)
app.use(commentRouter)

app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})
