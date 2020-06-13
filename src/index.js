import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProjectState from "./context/projectsContext/ProjectState"


ReactDOM.render(
  <ProjectState>
    <App />
  </ProjectState>

  ,
  document.getElementById('root')
);
