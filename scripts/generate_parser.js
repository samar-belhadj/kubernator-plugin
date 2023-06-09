const fs = require('fs');

import('lidy-js/parser/node_parse.js').then(({ preprocess }) => {
  preprocess('src/lidy/k8s.yml');
}).then(() => {
  return new Promise((resolve) => {
    fs.readFile('src/lidy/k8s.js', 'utf8', (err, data) => {
      resolve(data);
    });
  });
}).then((data) => {
  fs.writeFile(
    'src/lidy/k8s.js',
    data.replace("from '../parser/parse.js'", "from 'lidy-js'"),
    () => {}
  );
});

