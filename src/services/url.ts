import dotenv from "dotenv";

dotenv.config();

export const createUrl = () => {
console.log(process.env.HOST_ADDRESS + ":" + process.env.PORT);
}