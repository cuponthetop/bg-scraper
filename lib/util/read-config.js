let yaml = require('js-yaml');
let path = require('path');
let fs = require('fs');

let configPath = path.resolve(__dirname, '../../config/config.yaml');
const yamlObj = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))

module.exports = yamlObj;