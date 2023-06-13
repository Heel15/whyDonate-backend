import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import jwt from 'jsonwebtoken';
import users from '../models/users';

interface userAuthRequest extends Request {
    userId: string
    name: string
}
const message = 'Unauthorized access!';
export const auth = (req: userAuthRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(" ")[1];
            if (token) {
                jwt.verify(token, config.token.jwtToken, async (err, decoded: any) => {
                    if (decoded) {
                        if (decoded.id && decoded.name) {
                            await users.find({ _id: decoded.id }).then((data) => {
                                if (data.length) {
                                    req.userId = decoded.id;
                                    req.name = decoded.name;
                                    next();
                                } else {
                                    res.status(401).json({
                                        message
                                    });
                                }
                            }).catch((e: any) => {
                                res.status(500).json({
                                    message: 'Something went wrong!',
                                    errorMessage: e.message
                                });
                            });
                        } else {
                            res.status(401).json({
                                message
                            });
                        }
                    } else {
                        res.status(500).json({
                            message: 'Something went wrong!'
                        });
                    }
                });
            } else {
                res.status(401).json({
                    message
                });
            }
        } else {
            res.status(401).json({
                message
            });
        }
    } catch (e: any) {
        res.status(500).json({
            message: 'Something went wrong!',
            errorMessage: e.message
        });
    }
}