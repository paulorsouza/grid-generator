const fetch = require('node-fetch');
const getKeys = require('object-keys');

const template = 'import { Filters } from \'react-data-grid-addons\';\n\n' + 
  'const columns = [\n' +
  '{{#each names}}' +
  '  {\n' +
  '    key: \'{{this}}\',\n' +
  '    name: \'{{titleCase this}}\',\n' +
  '    filterable: true,\n' +
  '    resizable: true,\n' +
  '    hidden: false,\n' +
  '    filterRenderer: Filters.AutoCompleteFilter,\n' +
  '    sortable: true\n' +
  '  },\n' +
  '{{/each}}' +
  '];\n' +
  '\n' +
  'export default columns;';

const getSingleObject = function(data) {
  if (data instanceof Array) {
    return getObject(data[0]);
  }
  return data;
}

module.exports = function (plop) {
  plop.setHelper('getColumns', (url) => {
    return JSON.stringify(columns)
  });

  plop.setGenerator('grid', {
    description: 'this is a grid container generator',
    prompts: [{
      type: 'input',
      name: 'url',
      message: 'endpoint url'
    }, {
      type: 'input',
      name: 'modelName',
      message: 'file\'s name'
    }],
    actions: [{
      type: 'add',
      path: 'src/{{modelName}}/Grid{{properCase modelName}}.js',
      templateFile: 'plop_templates/gridComponent.hbs'
    }, {
      type: 'add',
      path: 'src/redux/modules/{{modelName}}.js',
      templateFile: 'plop_templates/gridRedux.hbs'
    }, function customAction(answers) {
      process.chdir(plop.getPlopfilePath());
      
      const changeFilePath = 'src/' + answers.modelName + '/columns.js'
      const fs = require('fs');
      
      fetch(answers.url)
      .then(response => response.json())
      .then(data => {
        const singleObject = getSingleObject(data)
        const keys = getKeys(singleObject);
        const obj = {names: keys}
        const render = plop.renderString(template, obj);
        fs.writeFileSync(changeFilePath, render);
      });

      return '';
    }
  ]});
}