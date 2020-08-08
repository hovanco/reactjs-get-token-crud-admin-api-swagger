import React, { Component } from 'react';
import NotFound from '../../images/notfoundpage.jpg';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="notfoundpage-containner">
        <div className="image-notfoundpage">
          <img src={NotFound} alt="not found page" />
        </div>
      </div>
    )
  }
}
export default NotFoundPage;
