import express from 'express'
const app = express()

import router from './Routes/user.routes'

app.use(express.json())
app.use('/users', router)
const port = 1024
app.listen(port, () => {
    console.log(`App running on port ${port}`)    
})