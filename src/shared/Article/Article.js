import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
    state = { 
        imageSource: "",
        imageIdList: []
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
                        case "application/json":
                        console.log("Znaleziono Dżejsona!");

                        // axios.get("https://ruje-test.herokuapp.com/article?id=datajson" + el.id )

                        // this.loadJSON("https://www.googleapis.com/drive/v2/files/1RH74-BIIuITMwF66EgrZ2QTg-FQlrVOw", data => {
                        //     console.log(data);
                        // },
                        // ()=>{console.log("kurła nima Dżejsona")});

                        axios.get("https://ruje-test.herokuapp.com/datajson?id=1RH74-BIIuITMwF66EgrZ2QTg-FQlrVOw")
                        .then(res => {
                            console.log(res);
                        });



                        break                    
                        default:
                            break;
                    }
                    
                });
                console.log(newState);
                this.setState(newState);
            }

            imageToDownload.src = "https://drive.google.com/uc?export=view&id=" + res.data[0].id;
            
        });

        // imageToDownload.src = "https://drive.google.com/uc?export=view&id=0BwJwNmFwiZmYX0lKS3NHamZKZE8tbklmYkt2Yi12WGZ2MzI4";
    }

    loadJSON(path, success, error)
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }

    render() { 
        return ( 
            <div className="Article" onClick={this.props.clickHandler}>
                <div className="header">Wikingowie go nienawidzą!</div>
                <div className="pictureBox">
                    {/* {this.imageEl} */}
                    <img src={this.state.imageSource} 
                    alt="Article picure"                     
                    />
                    <div className="imgCover"></div>
                </div>
                {/* <div className="content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, quasi. Fugiat soluta, vel reiciendis aliquam autem quos, nisi inventore architecto illum error delectus a ducimus beatae temporibus. Quaerat, magnam rem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero nihil, eveniet velit cumque ab quis hic id beatae, blanditiis in vitae atque ad deleniti minus voluptates, fugiat delectus ipsa!
                    </p>
                </div> */}
            </div>
         );
    }
}
 
export default Article;