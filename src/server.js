import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { createServer } = require('https');
const { readFileSync } = require('fs');
const ssl_port = 443;

const options = {
	//Cert and Key
	key: readFileSync('/etc/letsencrypt/live/adults-in-the-zoom.de/privkey.pem'),
	cert: readFileSync('/etc/letsencrypt/live/adults-in-the-zoom.de/fullchain.pem')
};

const handler = polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.get('*', (req, res) => {
		res.end(`POLKA: Hello from ${req.pathname}`);
	});

// Mount Polka to HTTPS server
createServer(options, handler).listen(ssl_port, _ => {
	console.log(`> Running on https://localhost:${ssl_port}`);
});


/* I'll leave that here:

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
*/