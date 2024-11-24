import React from 'react';
import LineComponent from './LineComponent';

const App: React.FC = () => {
  return (
    <div>
      <LineComponent />
      <h1>Welcome to the Line Effect</h1>
      <p>This is a paragraph with the line effect applied.</p>
      <h2>Subheading</h2>
      <p>Another paragraph that will have the effect too!</p>
    </div>
  );
};

export default App;
