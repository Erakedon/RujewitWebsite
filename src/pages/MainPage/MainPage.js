import React, { Component } from 'react';
import Article from '../../shared/Article/Article';

class MainPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="MainPage page">
                <Article />
                <Article />
                <Article />
            </div>
         );
    }
}
 
export default MainPage;