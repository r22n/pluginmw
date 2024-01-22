const { exec } = require('child_process');
const self = require('./package.json');

const sym = `//global.JSPLUGIN.${self.plugin}=function ${self.plugin}(_class_:${self.plugin}`;

exec(`echo ${sym} >> dist/${self.plugin}.js`);