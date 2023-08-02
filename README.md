# pluginmw
motionboard plugin item template project.

## setup

1. decide your plugin name e.g. `Sample01`
2. `$ degit https://github.com/r22n/pluginmw Sample01 # and change directory into it`
3. `$ vi package.json # edit line of "plugin": "Pluginmw", => "Sample01",`
4. `$ npm i`
5. `$ vi src/state.ts and src/App.vue # write your code`
6. `$ npm run make`
7. `dist/Sample01.js` is here