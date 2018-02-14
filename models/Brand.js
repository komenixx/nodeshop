var keystone = require('keystone');
var Types = keystone.Field.Types;

var Brand = new keystone.List('Brand', {
    autokey: { path: 'slug', from: 'name', unique: true },
	plural: 'Brands',
	singular: 'Brand'
});

Brand.add({
	name: { type: String, required: true },
	logo: { type: Types.CloudinaryImage, folder: 'brands' },
	avatar: { type: Types.CloudinaryImage, folder: 'brands' }
});

Brand.track = true;
Brand.defaultSort = 'name';
Brand.defaultColumns = 'name';

module.exports = Brand;
