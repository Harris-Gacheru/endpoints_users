import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

interface RequestExtended extends Request{
    users?:any
}

export const verifyToken = (req: RequestExtended, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string

        if (!token) {
            return res.json({Error: 'Not authorized to access'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        req.users = decoded 
        req.body.users = decoded
    } catch (error) {
        return res.json({Error: 'Invalid token'})
    }

    next()
}