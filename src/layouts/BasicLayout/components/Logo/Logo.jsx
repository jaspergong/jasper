import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './scss/dark.scss';
import './scss/light.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{marginLeft:'20px'}}>
        <Link to="/" className="logo-text" style={{color:'#f2f3f7'}}>
          Jasper
        </Link>
      </div>
    );
  }
}
