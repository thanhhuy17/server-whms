import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization

    const accessToken = token ? token.split(" ")[1] : '';
    try {
        if (!accessToken) {
            throw new Error(`Bạn không có quyền truy cập \n You're not authenticated`)
        }
        // console.log(accessToken);
        const verify: any = jwt.verify(accessToken, process.env.SECRET_KEY as string)
        if (!verify) {
            throw new Error("Token is not valid!")
        }
        req._id = verify._id
        console.log(verify);
        next()
    } catch (error: any) {
        console.log(error);
        return res.status(401).json({ error: error.message })
    }
}           