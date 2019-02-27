import React, { Component } from 'react';
import axios from 'axios';


class ArticleDisplay extends Component {
    state = { 
        display: "none",
        title: "Fajny tytuł",
        content: "Lorem ipsum dolor sit amet",
        currentImage: 1
     }

     imagesIdList = [];

     componentDidMount() {        
        console.log(this.props);

        //  if(this.props.location.search) {
        //     this.setState({display: "flex"});
        //     console.log("artukule pokaż się");
        //  } else {
        //     this.setState({display: "none"});
        //     console.log("artukule schow te tlusta dooope");

        //  }


        axios.get("https://ruje-test.herokuapp.com/articledata")
        .then(res => {
            console.log(res);
          
        });
     }

     loadImage(imageId,onListId) {
        let imageToDownload = new Image();
        imageToDownload.onload = () => {
            const newState = {
                imageSource: imageToDownload.src
            }
            this.setState(newState);
        };
     }

     showArticle() {
         if(this.props.history.location.search === "") {
             return "hiddenArticle";
         }
         else {
             return "ArticleDisplay";
         }
     }

    render() { 
        return ( 
            <div className={this.showArticle()}>
                <div className="title">{this.state.title}</div>
                {/* <div className="pictureBox">{this.props.title}</div> */}
                <div className="Title">{this.state.content}</div>
            </div>
         );
    }
}
 
export default ArticleDisplay;