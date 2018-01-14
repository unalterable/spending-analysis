import React from 'react';
import ReactDom from 'react-dom';
import Application from './components/Application.jsx';

const container = document.getElementById('app');

ReactDom.render(
  <Application />,
  container,
);
