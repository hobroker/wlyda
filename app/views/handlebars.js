const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');


handlebars.registerHelper(require('handlebars-layouts')(handlebars));

function read(file) {
	return fs.readFileSync(path.join(__dirname + '/', file), 'utf8');
}

let partials = {};

let partialDirectories = ['layouts', 'partials'];
partialDirectories.forEach(directory => {
	fs.readdirSync(__dirname + '/' + directory).forEach(file => {
		partials[file.slice(0, -4)] = read(directory + '/' + file)
	});
});

handlebars.registerPartial(partials);
