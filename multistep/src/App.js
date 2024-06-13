import logo from './logo.svg';
import './App.css';
import MultiStepForm from './component/MultiStepForm';

function App() {
  return (
    <div className="App">
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-10">Multi Step Form</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-4">
        <MultiStepForm />
      </div>
      </div>
    </div>
  );
}

export default App;
