import './App.css'
import Router from 'routes/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  interface Window {
    IMP: any;
  }
  return (
    <div className="App h-screen">
      <Router></Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={5}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
