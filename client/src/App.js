import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat</h1>
      </header>
      <main>
        <ul id="messages"></ul>
        <form action="">
          <input id="m"  /><button>Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
