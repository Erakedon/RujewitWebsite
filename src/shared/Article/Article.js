import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
    state = { 
        imageSource: "",
        imageIdList: [],
        title: "",
        loadingPage: "loading"
     }

    componentDidMount() {


        let imageToDownload = new Image();
        imageToDownload.onload = () => {
            const newState = {
                imageSource: imageToDownload.src
            }
            this.setState(newState);
        };

        axios.get("https://ruje-test.herokuapp.com/article?id=" + this.props.articleId )
        .then(res => {
            
            if(res) {
                console.log(res);
                let newState = {
                    imageIdList: [],
                    articleContent: {}
                };         
                res.data.forEach((el) => {
                    switch (el.mimeType) {
                        case "image/jpeg":
                            newState.imageIdList.push(el.id)
                            break;
                        case "application/vnd.google-apps.document":
                            newState.title = el.name;
                            break;

                        default:
                            break;
                    }
                    
                });
                newState.imageSource = "https://drive.google.com/uc?export=view&id=" + newState.imageIdList[0];
                this.setState(newState);
            }
            imageToDownload = this.state.imageSource;
            
        });

    }
    
    onPictureLoad() {
        this.setState({loadingPage: ""})
    }

    render() { 
        return ( 
            <div className={this.state.loadingPage + " Article"} onClick={this.props.clickHandler}>
                <div className="pictureBox">
                    {/* {this.imageEl} */}
                    <img src={this.state.imageSource} 
                    alt="Article picure"                 
                    onLoad={() => {this.onPictureLoad()}}    
                    />
                <div className="header">{this.state.title}</div>
                </div>
            </div>
         );
    }
}
 
export default Article;