import { writeFile } from 'fs';
import http from 'https';

export function RequestAndSave(username) {

    // Define the URL to make the request to
    const url = `https://api.github.com/users/${username}/repos`;

    const options = {
        hostname: 'api.github.com',  // GitHub API hostname
        port: 443,                // Default port for HTTPS
        path: `/users/${username}/repos`,  // API endpoint path
        method: 'GET',            // HTTP method
        headers: {
            'User-Agent': 'MyNodeClient/1.0',  // Add your custom User-Agent here
            'Accept': '*/*'

        }
    };

    // Define the file where the data will be saved
    const filePath = `${username}.txt`;

    // Make the HTTP GET request
    http.get(options, (res) => {
        let data = '';

        // Collect the data chunks
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Handle the end of the response
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const repos = JSON.parse(data);
                const repoNames = repos.map(repo => repo.name);

                // Write the repository names to a file
                writeFile(`${username}.txt`, repoNames.join('\n'), (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    } else {
                        console.log(`Repository names saved to ${username}.txt`);
                    }
                });
            } else {
                console.error(`Failed to fetch repositories: ${res.statusCode}`);
            }
        });
    }).on('error', (e) => {
        console.error(`Request error: ${e.message}`);
    }).end();

}