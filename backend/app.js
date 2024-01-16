import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/monument', (req, res) => {
    const filePath = join(__dirname, 'data/monument.json');
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/misc_fact', (req, res) => {
	const filePath = join(__dirname, 'data/misc_fact.json');
	console.log(filePath);
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.get('/poi', (req, res) => {
	const filePath = join(__dirname, 'data/poi.json');
	console.log(filePath);
	res.sendFile(filePath, (err) => {
		 if (err) {
			  console.error(err);
			  res.status(500).send('Internal Server Error');
		 }
	});
});

app.listen(3500, () => {
    console.log('listening to port 3500');
});