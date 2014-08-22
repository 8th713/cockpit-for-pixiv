'use strict';

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
document.head.appendChild(link);

var app = require('./app');

app.$appendTo(document.body);
