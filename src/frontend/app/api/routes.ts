import { NextApiRequest, NextApiResponse } from "next";


export async function GET(req: NextApiRequest) {
    return req.body({
        hello: "world"
    }) 
}