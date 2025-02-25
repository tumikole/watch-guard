import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as UIProvider } from "./Components/ui/provider"; // Rename UI Provider
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as ReduxProvider } from 'react-redux'; // Rename Redux Provider
import store from './Redux/Store/store';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <ReduxProvider store={store}> {/* Redux Provider for state management */}
      <UIProvider> {/* UI Provider (if it's for theme/styling) */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UIProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// Start performance logging
reportWebVitals();
