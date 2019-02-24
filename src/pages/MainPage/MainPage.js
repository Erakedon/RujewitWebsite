import React, { Component } from 'react';
import Article from '../../shared/Article/Article';

class MainPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="MainPage page">
                <Article imageId={0} />
                <Article imageId={1} />
                <Article imageId={2} />
                <Article imageId={0} />
                <Article imageId={1} />
                <Article imageId={2} />
                <Article imageId={0} />
                <Article imageId={1} />
                <Article imageId={2} />
                <Article imageId={0} />
                <Article imageId={1} />
                <Article imageId={2} />
            </div>
         );
    }
}
 
export default MainPage;