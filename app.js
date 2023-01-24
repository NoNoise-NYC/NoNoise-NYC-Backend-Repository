const express = require('express')
const app = express()
const cors = require('cors')
const port = 4005
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRouter')




app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(postRouter)

app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})
