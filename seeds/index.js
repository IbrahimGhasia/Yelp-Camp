const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeddb = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '61e2f43b1eebb83bfda27ae2',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, illo eaque laboriosam error laudantium fuga ad nesciunt odit maiores expedita aspernatur praesentium reprehenderit inventore autem deleniti recusandae provident necessitatibus fugit!',
			price,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/daydu0l4u/image/upload/v1642525202/YelpCamp/uyht1we0oxvoqb1s4qwm.jpg',
					filename: 'YelpCamp/uyht1we0oxvoqb1s4qwm',
				},
				{
					url: 'https://res.cloudinary.com/daydu0l4u/image/upload/v1642525204/YelpCamp/vurgeuh7uabvv7i5oqhj.jpg',
					filename: 'YelpCamp/vurgeuh7uabvv7i5oqhj',
				},
				{
					url: 'https://res.cloudinary.com/daydu0l4u/image/upload/v1642525222/YelpCamp/vlcykncyig1sp4hhkh1g.jpg',
					filename: 'YelpCamp/vlcykncyig1sp4hhkh1g',
				},
				{
					url: 'https://res.cloudinary.com/daydu0l4u/image/upload/v1642525223/YelpCamp/gcp1efyadyi6l6b0nagw.jpg',
					filename: 'YelpCamp/gcp1efyadyi6l6b0nagw',
				},
			],
		});
		await camp.save();
	}
};

seeddb().then(() => {
	mongoose.connection.close();
});
