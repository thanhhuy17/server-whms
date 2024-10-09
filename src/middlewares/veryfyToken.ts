import jwt from 'jsonwebtoken'

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization

    const accessToken = token ? token.split(" ")[1] : '';
    try {
        console.log(accessToken);
    } catch (error) {
        console.log(error);
    }
}           