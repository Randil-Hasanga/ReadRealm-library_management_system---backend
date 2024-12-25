import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  const [expanded, setExpanded] = useState(true); // State to control sidebar expansion

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <main className={`flex-grow p-4 transition-all ${expanded ? 'ml-64' : 'ml-16'}`}>
        <h1 className="text-2xl font-bold">Welcome to the Application</h1>
        <p>Here is your main content area.</p>
      </main>
    </div>
  );
}

export default App;
