export class Jwt {
    private constructor() {
        this.userId = null;
        this.tokenData = null
    }
    private userId: number | null;
    private tokenData: object | null;

    static create(): Jwt {
        return new Jwt();
    }

    saveUserId(userId: number): void {
        this.userId = userId;
    }

    getUserId(): number | null {
        return this.userId || null;
    }

    saveTokenData(data: object): void {
        this.tokenData = data;
        console.log(this);
    }
}