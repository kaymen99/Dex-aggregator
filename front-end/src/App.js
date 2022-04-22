import './App.css';
import Main from "./components/Main";
import Swap from './components/Swap';

function App() {

  return (
    <div >

      <Main />
      <div style={{ textAlign: "center" }}>
        <h3>Multi-Chain Dex Aggregator</h3>
      </div>
      <Swap />
    </div>
  );
}

export default App;

