import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const parseCSV = (buffer: Buffer): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);

        readableStream
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};