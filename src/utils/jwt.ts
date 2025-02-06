import {JwtPayload} from 'jsonwebtoken';

export class Jwt {
    private static instance: Jwt | null = null;

    private constructor() {
        this.userId = null;
        this.tokenData = null;
    }

    private userId: number | null;
    private tokenData: JwtPayload | null;

    static getInstance(): Jwt {
        if (!Jwt.instance) {
            Jwt.instance = new Jwt();
        }
        return Jwt.instance;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }

    getUserId(): number | null {
        return this.userId;
    }

    setTokenData(data: JwtPayload ): void {
        this.tokenData = data;
    }

    getTokenData(): JwtPayload | null {
        return this.tokenData;
    }
}
