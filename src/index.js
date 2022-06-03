import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@vraja-sage/gitpack';
import { DisplayReport }  from './lib/'
ReactDOM.render(
    <React.StrictMode>
          <DisplayReport mainLayoutId={1}/>
    </React.StrictMode>,
    document.getElementById('root')
  );

// serviceWorker.unregister();

// reportWebVitals();
