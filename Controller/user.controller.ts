import { RequestHandler } from 'express'
import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import sqlConfig from '../Config/config'
import { RegisterSchema } from '../Helpers/registerValidator'
import { LoginSchema } from '../Helpers/loginValidator'

export const createUser: RequestHandler = async(req, res) => {
    try {
        const { username, fullname, email, age, roles, password } = req.body as { username: string, fullname: string, email: string, age: number, roles: string, password: string }

        const { error } = RegisterSchema.validate(req.body)

        if (error) {
            return res.json({Error: error})
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
    
            let pool = await mssql.connect(sqlConfig)
            await pool.request()
            .input('username', mssql.VarChar, username)
            .input('fullname', mssql.VarChar, fullname)
            .input('email', mssql.VarChar, email)
            .input('age', mssql.Int, age)
            .input('roles', mssql.VarChar, roles)
            .input('password', mssql.VarChar, hashedPassword)
            .execute('createUser')
    
            res.json({message: 'User created successfully'})
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const getUsers: RequestHandler = async(req, res) => {
    try {
        let pool = await mssql.connect(sqlConfig)
        const users = await pool.request().execute('getUsers')

        res.json(users.recordset)
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const getUser: RequestHandler<{id: number}> = async(req, res) => {
    try {
        const id = req.params.id

        let pool = await mssql.connect(sqlConfig)
        let user = await pool.request()
        .input('id', mssql.Int, id)
        .execute('getUser')

        if (!user.recordset[0]) {
            res.json({message: `User with id ${id} does not exist`})
        }else{
            res.json(user.recordset)
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const deleteUser: RequestHandler<{id: number}> = async(req, res) => {
    try {
        const id = req.params.id

        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('id', mssql.Int, id)
        .execute('getUser')
        
        if (!user.recordset[0]) {
            res.json({message: `User with id ${id} does not exist`})
        }else{
            await pool.request()
            .input('id', mssql.Int, id)
            .execute('deleteUser')

            res.json({message: `User deleted successfully`})
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const updateUser: RequestHandler<{id: number}> = async (req, res) => {
    try {
        const id = req.params.id
        const { username, fullname, email, age, roles } = req.body as { username: string, fullname: string, email: string, age: number, roles: string }

        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('id', mssql.Int, id)
        .execute('getUser')
        
        if (!user.recordset[0]) {
            res.json({message: `User with id ${id} does not exist`})
        }else{
            await pool.request()
            .input('id', mssql.Int, id)
            .input('username', mssql.VarChar, username)
            .input('fullname', mssql.VarChar, fullname)
            .input('email', mssql.VarChar, email)
            .input('age', mssql.Int, age)
            .input('roles', mssql.VarChar, roles)
            .execute('updateUser')

            res.json({message: `User updated successfully`})
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const searchByUsername: RequestHandler<{username: string}> = async(req, res) => {
    try {
        const username = req.params.username

        let pool = await mssql.connect(sqlConfig)
        let user = await pool.request()
        .input('username', mssql.VarChar, username)
        .execute('searchByUsername')

        if (!user.recordset[0]) {
            res.json({message: `User with username ${username} does not exist`})
        } else {
            res.json(user.recordset)
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const resetPassword: RequestHandler<{id: string}> =async (req, res) => {
    try {
        const id = req.params.id
        const password = req.body.password 

        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('id', mssql.Int, id)
        .execute('getUser')
        
        if (!user.recordset[0]) {
            res.json({message: `User with id ${id} does not exist`})
        }else{
            await pool.request()
            .input('id', mssql.Int, id)
            .input('password', mssql.VarChar, password)
            .execute('resetPassword')

            res.json({message: `Password updated successfully`})
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const login: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body as { username: string, password: string }

        const { error } = LoginSchema.validate(req.body)

        if (error) {
            return res.json({Error: error})
        }

        let pool = await mssql.connect(sqlConfig)
        let user = await pool.request()
        .input('username', mssql.VarChar, username)
        .execute('searchByUsername')

        if (!user.recordset[0]) {
            res.json({message: `User does not exist`})
        } else {
            const validPassword = await bcrypt.compare(password, user.recordset[0].password)
            if (validPassword) {
                let payload = await pool.request().query(
                    `SELECT fullname, email FROM users WHERE username = '${username}'`
                )
                payload = payload.recordset[0]

                const token = jwt.sign(payload, process.env.SECRET_KEY as string, {expiresIn: '10m'})

                res.json({message: 'Logged in successfully', token: token})
            }else {
                res.json({message: 'Invalid credentials'})
            }
        }
    } catch (error: any) {
        res.json({Error: error.message})
    }
}

export const homepage:RequestHandler = (req, res)=>{
    res.json({message:'Welcome...'})
}