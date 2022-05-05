import express from 'express'
const app = express()

import router from './Routes/user.routes'

// import mssql from 'mssql'
// import sqlConfig from './Config/config'

app.use(express.json())
app.use('/users', router)
const port = 1024
app.listen(port, () => {
    console.log(`App running on port ${port}`)    
})

// const checkConnection = async() => {
//     try {
//         await mssql.connect(sqlConfig).then(
//             conn => {
//                 if (conn.connected) {
//                     console.log('DB connected')                
//                 }
//             }
//         )
//     } catch (error: any) {
//         console.log(error.message)        
//     }
// }

// checkConnection()