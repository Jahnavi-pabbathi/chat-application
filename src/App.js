import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import { MainRouter } from './MainRouter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <MainRouter />
        </Router>
        
      </header>
    </div>
  );
}

export default App;
