import { Request, Response } from "express";
import axios from "axios";

const getTvShowByTitle = (req: Request, res: Response) => {
    try {
        const query = req.query;
        axios.get(`https://api.tvmaze.com/search/shows?q=${query.query}`).then((response: any) => {
            if (response.status === 200) {
                res.status(200).json({
                    data: response.data,
                });
            } else {
                res.status(500).json({
                    message: 'Something went wrong!',
                });
            }
        }).catch((e) => {
            res.status(500).json({
                message: 'Something went wrong!',
                errorMessage: e.message
            });
        });
    } catch (e: any) {
        res.status(500).json({
            message: 'Something went wrong!',
            errorMessage: e.message
        });
    }
}

export default { getTvShowByTitle };