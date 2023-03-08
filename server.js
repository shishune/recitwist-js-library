/* server.js - Express server*/
// code used from Week 8 lecture

'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')))

// Let's make some express 'routes'
// Express has something called a Router, which 
// takes specific HTTP requests and handles them
// based on the HTTP method and URL

// Let's make a route for an HTTP GET request to the 
// 'root' of our app (i.e. top level domain '/')

app.get('/', (req, res) => {
	//sending some HTML
	res.send('<h1>Welcome to my Library</h1>')
    
})



// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.



