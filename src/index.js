import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import DisplayReport from './DisplayReport';
import reportWebVitals from './reportWebVitals';
// import './styles/styles.css';
// import './styles/resizable.css';
// import 'bootstrap/dist/css/bootstrap.css';  
// // import { store, persistor } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
          <DisplayReport mainLayoutId={1} />
    </React.StrictMode>,
    document.getElementById('root')
  );

serviceWorker.unregister();

reportWebVitals();
