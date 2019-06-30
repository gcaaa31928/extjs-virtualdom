var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="age &gt; 1">',  // <-- Note that the > is encoded
            '<p>{#}: {name}</p>',  // <-- Auto-number each item
            '<p>In 5 Years: {age+5}</p>',  // <-- Basic math
            '<p>Dad: {parent.name}</p>',
        '</tpl>',
    '</tpl></p>'
);
tpl.overwrite(panel.body, data);


var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="this.isGirl(name)">',
            '<p>Girl: {name} - {age}</p>',
        '</tpl>',
        // use opposite if statement to simulate 'else' processing:
        '<tpl if="this.isGirl(name) == false">',
            '<p>Boy: {name} - {age}</p>',
        '</tpl>',
        '<tpl if="this.isBaby(age)">',
            '<p>{name} is a baby!</p>',
        '</tpl>',
    '</tpl></p>',
    {
        // XTemplate configuration:
        compiled: true,
        disableFormats: true,
        // member functions:
        isGirl: function(name){
            return name == 'Sara Grace';
        },
        isBaby: function(age){
            return age < 1;
        }
    }
);
tpl.overwrite(panel.body, data);


<tpl if="age > 1 && age < 10">Child</tpl>
<tpl if="age >= 10 && age < 18">Teenager</tpl>
<tpl if="this.isGirl(name)">...</tpl>
<tpl if="id==\'download\'">...</tpl>
<tpl if="needsIcon"><img src="{icon}" class="{iconCls}"/></tpl>
// no good:
<tpl if="name == "Jack"">Hello</tpl>
// encode " if it is part of the condition, e.g.
<tpl if="name == &quot;Jack&quot;">Hello</tpl>

