import React, { Component } from 'react';

class HeaderBg extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="HeaderBg">
                {this.props.children}
            </div>
         );
    }
}
 
export default HeaderBg;