const path = require('path');

module.exports = {
  process(_, filename) {
    return `module.exports = '${path.basename(filename)}';`;
  },
};
