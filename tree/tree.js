#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const curPath = path.resolve(process.cwd());

function draw(file, deep) {
  return lines(deep) + file;
}

function lines(deep) {
  var tpl = '|' + '  '.repeat(deep - 1);

  if (deep > 1) {
    tpl += '|'
  }

  tpl += '--';
  return tpl;
}

function tree(curPath, deep) {
  var files = fs.readdirSync(curPath);
  files.forEach((file) => {
    const newPath = path.resolve(curPath, file);
  const stats = fs.statSync(newPath);
  if (stats.isDirectory()) {
    console.log(draw(file, deep));
    tree(newPath, deep + 1);
  } else {
    console.log(draw(file, deep));
  }
});
}


console.log('.');

tree(curPath, 1);

module.exports = tree;