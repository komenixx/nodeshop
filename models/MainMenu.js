var keystone = require('keystone');
var Types = keystone.Field.Types;

var MainMenu = new keystone.List('MainMenu', {
    autokey: { path: 'slug', from: 'name', unique: true },
    plural: 'MainMenu',
    singular: 'MainMenu',
    sortable: true
});

MainMenu.add({
    name: { type: String, required: true },
    type: { type: Types.Select, options: 'post, url', default: 'url' },
    post: { type: Types.Relationship, ref: 'Post', dependsOn: { type: 'post' } },
    url: { type: Types.Url, dependsOn: { type: 'url' } }
});

MainMenu.track = true;
MainMenu.defaultSort = 'sortOrder';
MainMenu.defaultColumns = 'name';

module.exports = MainMenu;
