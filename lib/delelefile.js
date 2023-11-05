const path = require('path');
const fsx = require('fs-extra');

const dataFolderPath = path.join(__dirname, '..', 'file');
fsx.emptyDirSync(dataFolderPath);