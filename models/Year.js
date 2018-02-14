var keystone = require('keystone');

var Year = new keystone.List('Year', {
    autokey: { path: 'slug', from: 'name', unique: true },
	plural: 'Years',
	singular: 'Year'
});

Year.add({
	name: { type: String, required: true }
});

Year.track = true;
Year.defaultSort = 'name';
Year.defaultColumns = 'name';

module.exports = Year;
