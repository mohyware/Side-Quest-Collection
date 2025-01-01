import { Router } from 'express';
import multer from 'multer';
import DatabaseService from '../services/database.service';
import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import { GridFSBucket } from 'mongodb';
const router = Router();


// Download single file
router.get('/download/:fileId', async (req, res, next) => {
    const fileId = req.params.fileId;

    try {
        const bucket: GridFSBucket = DatabaseService.getGridFSBucket();

        const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', (err) => {
            console.error('Error downloading file:', err);
            res.status(404).send('File not found.');
        });

        downloadStream.on('end', () => {
            res.end();
        });
    } catch (err) {
        console.error('Error in download route:', err);
        next(err);
    }
});

// get all files
router.get('/', async (req, res, next) => {
    try {
        const bucket: GridFSBucket = DatabaseService.getGridFSBucket();
        const files = await bucket.find().toArray();

        const images = files.map(file => ({
            id: file._id,
            title: file.filename,
            url: `/download/${file._id}`
        }));

        res.render('index', { images });
    } catch (err) {
        console.error('Error fetching images:', err);
        next(err);
    }
});

const upload = multer({ dest: 'images/' })
// upload
router.post(
    '/upload',
    upload.single('file'),
    async (req, res, next) => {
        console.log(req.file)
        try {
            const title = req.body.title;
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
            const filename = file.filename
            const filePath = path.join(__dirname, '../../images', filename);

            const bucket = DatabaseService.getGridFSBucket();

            const filestream = fs.createReadStream(filePath);

            const uploadStream = bucket.openUploadStream(title, {
                chunkSizeBytes: 1048576,
                metadata: { field: 'file', value: file, extension: file.mimetype }
            });

            filestream.pipe(uploadStream)
                .on('error', (error) => {
                    console.error('Upload failed:', error);
                    res.status(500).send('Error uploading file.');
                })
                .on('finish', () => {
                    console.log(`${title} saved successfully`);
                    res.redirect('/');
                });

        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;