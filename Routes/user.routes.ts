import express from 'express'
import { createUser, deleteUser, getUser, getUsers, homepage, login, resetPassword, searchByUsername, updateUser } from '../Controller/user.controller'
import { verifyToken } from '../Middleware/verifyToken'
const router = express.Router()

router.post('/create', createUser)
router.post('/login', login)
router.get('/', getUsers)
router.get('/home', verifyToken,homepage)
router.get('/:id', getUser)
router.get('/username/:username', searchByUsername)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.patch('/reset/:id', verifyToken, resetPassword)

export default router