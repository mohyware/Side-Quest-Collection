import mongoose, { Mongoose } from "mongoose";
import { GridFSBucket } from "mongodb";

class DatabaseService {
    readonly DATABASE_URI = process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/gallery";
    private static instance: DatabaseService;
    private db?: Mongoose;
    private gridFSBucket?: GridFSBucket;

    public static getInstance(): DatabaseService {
        if (this.instance) return this.instance;
        this.instance = new DatabaseService();
        return this.instance;
    }

    async connect() {
        if (this.db) return this.db;
        this.db = await mongoose.connect(this.DATABASE_URI);
        const connection = await mongoose.connection.getClient().db(); // Get the underlying native MongoDB connection
        this.gridFSBucket = new GridFSBucket(connection, {
            bucketName: 'uploads', // Specify your bucket name (default is 'fs')
        });
        return this.db;
    }

    async disconnect() {
        if (!this.db) return;
        await this.db.disconnect();
        this.db = undefined;
    }

    getGridFSBucket() {
        if (!this.gridFSBucket) {
            throw new Error("GridFSBucket is not initialized");
        }
        return this.gridFSBucket;
    }
}

export default DatabaseService.getInstance();
