import { Router } from 'express';
import DatabaseService from '../services/database.service';
import { Trip } from '../models/trip.model';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { isValidDate } from '../utilities/isValidDate'
import { stringToDate } from '../utilities/stringToDate'

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, date_from, date_till, sort, departure, destination } = req.query;

        // Convert page and limit to integers
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        // Build query object
        let query: any = {};

        // Date filter
        if (date_from) {
            const valid = isValidDate(date_from as string);
            if (!valid) {
                return res.status(400).json({ error: 'Invalid date_from format. Use DD-MM-YYYY.' });
            }
            query.startingDate = { $gte: stringToDate(date_from as string) }; // Convert to JavaScript Date
        }
        if (date_till) {
            const valid = isValidDate(date_till as string);
            if (!valid) {
                return res.status(400).json({ error: 'Invalid date_till format. Use DD-MM-YYYY.' });
            }
            query.endDate = { $lte: stringToDate(date_till as string) }; // Convert to JavaScript Date
        }
        // Departure and destination filters
        if (departure) {
            query.departure = departure;
        }
        if (destination) {
            query.destination = destination;
        }

        // Sorting
        let sortOptions: any = {};
        if (sort) {
            const sortFields = (sort as string).split(',').map((field) => {
                return field.startsWith('-') ? [field.slice(1), -1] : [field, 1];
            });
            sortOptions = Object.fromEntries(sortFields);
        }

        // Fetching trips with pagination, filtering, and sorting
        const trips = await Trip.find(query)
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        // Get total count for pagination info
        const totalCount = await Trip.countDocuments(query);

        res.json({
            totalCount,
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage: pageNumber,
            trips,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    const {
        departurePlace,
        destination,
        startingDate,
        duration,
        passengers, } = req.body;
    console.log(departurePlace, destination, startingDate, duration, passengers)
    if (!departurePlace || !destination || !startingDate || !duration || !passengers) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send({
                error: "invalid cardinalates"
            });
    }

    if (!isValidDate(startingDate)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .send({ error: "Invalid date format: Expected DD-MM-YYYY." });
    }

    const sDateObject = stringToDate(startingDate);
    const eDateObject = new Date(sDateObject);
    eDateObject.setDate(eDateObject.getDate() + duration);

    if (passengers < 2) {
        return res.status(StatusCodes.BAD_REQUEST)
            .send({ error: "Invalid number of passengers: must be greater than 1." });
    }

    const trip = await Trip.create({
        departurePlace,
        destination,
        startingDate: sDateObject,
        endDate: eDateObject,
        duration,
        passengers,
    })

    res.status(StatusCodes.OK)
        .send({
            msg: "trip scheduled successfully"
            ,
            trip: trip
        });
})

export default router;