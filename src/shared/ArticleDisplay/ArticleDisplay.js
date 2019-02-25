import React, { Component } from 'react';
import axios from 'axios';


class ArticleDisplay extends Component {
    state = { 
        currentImage: 1
     }

     imagesIdList = [];

     componentDidMount() {         


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

    render() { 
        return ( 
            <div className="ArticleDisplay">
                <div className="title">{this.props.title}</div>
                <div className="pictureBox">{this.props.title}</div>
                <div className="Title">{this.props.title}</div>
            </div>
         );
    }
}
 
export default ArticleDisplay;