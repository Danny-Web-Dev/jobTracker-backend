export class Jwt {
    private static instance: Jwt | null = null;

    private constructor() {
        this.userId = null;
        this.tokenData = null;
    }

    private userId: number | null;
    private tokenData: object | null;

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

    setTokenData(data: object): void {
        this.tokenData = data;
    }

    getTokenData(): object | null {
        return this.tokenData;
    }
}
