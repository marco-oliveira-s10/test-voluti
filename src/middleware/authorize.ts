import {
    Request,
    Response,
    NextFunction
} from 'express';

export const authorize = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token !== 'VALID_AUTH_TOKEN') {
        res.status(403).json({
            error: 'Unauthorized'
        });
        return;
    }

    next();
};