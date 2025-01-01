import express from "express";
import dotenv from 'dotenv';

dotenv.config();

class Config {
    readonly PORT = Number(process.env.PORT) || 3000;
    readonly app = express();
    private static instance: Config;

    static getInstance() {
        if (this.instance) return this.instance;
        this.instance = new Config();
        return this.instance;
    }

    listenAsync() {
        return new Promise((resolve, reject) => {
            try {
                this.app.listen(this.PORT, () => resolve(this.app));
            } catch (err) {
                reject(err);
            }
        })
    }

    async runApp() {
        try {
            await this.listenAsync();
            console.log(`Working on http://localhost:${this.PORT}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default Config.getInstance();