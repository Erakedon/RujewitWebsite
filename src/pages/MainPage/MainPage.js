import React, { Component } from 'react';
import Article from './../../shared/Article/Article';
import FullWidthText from '../../shared/FullWidthText/FullWidthText';
import axios from 'axios';

class MainPage extends Component {
    state = { 
        storyContent: ""
     }


    
  loadStory() {
    axios
      .get("https://ruje-test.herokuapp.com/articlecontent?id=1QRf0LNvZHhy5HOzktmxm2s3CiCmLRnnoQ7faL5QlPNY")
      .then(res => {
        console.log(res);
        if(this.state.currentDescription !== res.data)
            this.setState({
                storyContent: res.data
            });
      });
  }


    linkToArticle(articleId) {
        // this.props.headerPropsRef.history.push(url);
        console.log("open article " + articleId);
        console.log(this.props);
        this.props.history.push("/travels/article?" + articleId);

    }

    render() { 
        // this.loadStory();
        return ( 
            <div className="MainPage page">

            {/* <FullWidthText >{this.state.storyContent}</FullWidthText> */}
            
            <Article 
            clickHandler={() => {this.linkToArticle("1Y9MuA-_WPLNlOd3iCcXkBfs8gHEU1xhy")}} 
            articleId={"1Y9MuA-_WPLNlOd3iCcXkBfs8gHEU1xhy"} />
            <Article 
            clickHandler={() => {this.linkToArticle("1DIPW0PaUoZukhXk2qUqoai1oGVbhsBSb")}} 
            articleId={"1DIPW0PaUoZukhXk2qUqoai1oGVbhsBSb"} />



            </div>
            
            
         );
    }
}
 
export default MainPage;