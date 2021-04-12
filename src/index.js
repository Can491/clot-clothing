import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


/*这两个都是为persist storage而引进 */
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react"; //redux-persist针对于多个platform像react-native,react等等

/*引进了react-router-dom这个library之后，需要用<BrowserRouter>标签包裹<App />使之获得routing功能*/
//Provider包裹<App/>使得可以access redux相关的library
//在 store context中我们可以dispatch action in our store and pull value out of the store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


