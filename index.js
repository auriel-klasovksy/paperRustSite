const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) =>
	res.redirect('/main')
)
app.use( '/', express.static( path.join( __dirname, 'public')))
app.get('/*+', (req, res) =>
	res.sendFile( path.join( __dirname, 'public/index.html'))
)

app.listen( PORT, _ => console.log(`listening on ${PORT}`))
