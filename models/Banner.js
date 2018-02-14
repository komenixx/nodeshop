var keystone = require('keystone');
var Types = keystone.Field.Types;

var Banner = new keystone.List('Banner', {
    autokey: { path: 'slug', from: 'name', unique: true },
    plural: 'Banners',
    singular: 'Banner'
});

Banner.add({
	name: { type: String },
    images: { type: Types.CloudinaryImages, folder: 'banners' }
});

Banner.track = true;
Banner.defaultSort = 'name';
Banner.defaultColumns = 'name';

module.exports = Banner;
