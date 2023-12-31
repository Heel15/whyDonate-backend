import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import users from "../models/users";
import { config } from "../config/config";

const login = (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            users.find({ email, password }, { password: 0 }).then((data: any) => {
                if (data.length) {
                    const generatedToken = jwt.sign({ id: data[0]._id, email: data[0].email }, config.token.jwtToken);
                    res.status(200).json({
                        userData: data[0],
                        token: generatedToken
                    });
                } else {
                    res.status(404).json({
                        message: 'User not found!'
                    });
                }
            }).catch((e: any) => {
                res.status(500).json({
                    message: 'Somthing went wrong!',
                    errorMessage: e.message
                });
            });
        } else {
            res.status(400).json({
                message: 'Bad request!'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'Somthing went wrong!'
        });
    }
}

export default { login };
