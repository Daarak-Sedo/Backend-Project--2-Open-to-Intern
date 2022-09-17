const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Bhuwan:fake2fake@cluster0.rxpkrsx.mongodb.net/Project-2?retryWrites=true&w=majority", {
    useNewUrlParser: true
}
)
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


