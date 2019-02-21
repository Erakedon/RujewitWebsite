import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
    state = { 
        imageSource: ""
     }
    //  https://drive.google.com/uc?export=view&id=0BwJwNmFwiZmYX0lKS3NHamZKZE8tbklmYkt2Yi12WGZ2MzI4


    // imageEl = (<img src={this.state.imageSource} alt="Article picure" />);

    componentDidMount() {


        let imageToDownload = new Image();
        imageToDownload.onload = () => {
            const newState = {
                imageSource: imageToDownload.src
            }
            this.setState(newState);
        };

        axios.get("https://ruje-test.herokuapp.com/imgids")
        .then(res => {
            console.log(res);
            const files = JSON.parse(res);
            console.log(files);

        imageToDownload.src = "https://drive.google.com/uc?export=view&id=" + files[0].id;
            
        });

        // imageToDownload.src = "https://drive.google.com/uc?export=view&id=0BwJwNmFwiZmYX0lKS3NHamZKZE8tbklmYkt2Yi12WGZ2MzI4";
    }

    displayImg() {
        return this.state.imageSource ? {display: "block"} : {display: "none"}
    }

    render() { 
        return ( 
            <div className="Article">
                <div className="header">Wikingowie go nienawidzą!</div>
                <div className="pictureBox">
                    {/* {this.imageEl} */}
                    <img src={this.state.imageSource} 
                    alt="Article picure" 
                    style={this.state.imageSource ? {display: "block"} : {display: "none"}} 
                    />
                    <div style={this.state.imageSource ? {display: "none"} : {display: "block"}}>Loading</div>
                </div>
                <div className="content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, quasi. Fugiat soluta, vel reiciendis aliquam autem quos, nisi inventore architecto illum error delectus a ducimus beatae temporibus. Quaerat, magnam rem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero nihil, eveniet velit cumque ab quis hic id beatae, blanditiis in vitae atque ad deleniti minus voluptates, fugiat delectus ipsa!
                    </p>
                </div>
            </div>
         );
    }
}
 
export default Article;