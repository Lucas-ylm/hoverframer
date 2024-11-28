import React from 'react';
import LineComponent from './LineComponent';

const App: React.FC = () => {
  return (
    <div>
      <LineComponent />
      <div className='lol'>
        <h1>some title</h1>
        <p>some text.</p>
      </div>
      <div>
        <h1>another loooooooooooong title</h1>
        <p>another randoooooooooom text.</p>
      </div>
    </div>
  );
};

export default App;