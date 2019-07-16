import React, { Component } from 'react';
import LoadingIcon from './../LoadingIcon/LoadingIcon';

class Article extends Component {
    state = { 
        imageLoading: true,
        currentImageIndex: 0,
        thumbnailsVisible: false
     }

     thumbnailBtnTxtOnHiddenState = "Pokaż wszystkie zdjęcia";
     thumbnailBtnTxtOnVisibleState = "Ukryj zdjęcia";

     articleHtmlReference;

     componentDidMount() {
         this.articleHtmlReference = document.getElementById("article" + this.props.id);
     }

     scrollToMainPicture() {
      window.scrollTo(0,this.articleHtmlReference.offsetTop);
     }

     selectImage(imageId) {
        this.scrollToMainPicture();

        if(imageId < 0) imageId = this.props.images.length - 1;
        else if(imageId > this.props.images.length - 1) imageId = 0;

        if(this.state.currentImageIndex !== imageId) 
            this.setState({currentImageIndex: imageId, imageLoading: true})
     }

    render() { 
        const pictureUrlPrefix = "https://drive.google.com/uc?export=view&id=";
        const thumbnailUrlPrefix = "https://drive.google.com/thumbnail?authuser=0&sz=w200&id=";

        const articleDescriptionDiv = this.props.description ? 
            (<div className="description">{this.props.description}</div>) : [];

        const picture = <img src={pictureUrlPrefix + this.props.images[this.state.currentImageIndex]} alt="" />;

        let thumbnails = [];
        let thumbnailsBtn;

        if(this.props.images.length > 1) {
            const btnTxt = this.state.thumbnailsVisible ? this.thumbnailBtnTxtOnVisibleState : this.thumbnailBtnTxtOnHiddenState;
            thumbnailsBtn = (<button onClick={() => {this.setState({thumbnailsVisible: !this.state.thumbnailsVisible})}}>{btnTxt}</button>);
        }

        if(this.state.thumbnailsVisible)
            this.props.images.forEach((image,i) => {
                const classname = i === this.state.currentImageIndex ? "selected" : "";
                thumbnails.push(
                    <img className={classname} 
                    src={thumbnailUrlPrefix + image} alt="" key={i}
                    onClick={() => {this.selectImage(i)}} />
                );
            });

        
        return ( 
            <div className={this.props.visible ? "Article " : "Article hidden "} id={"article" + this.props.id}>

                <div className="header">
                    <div className="shieldHalf">
                        <div className="shieldQuater"></div>
                        <div className="shieldQuater"></div>
                    </div>
                    <div className="name">{this.props.name}</div>     
                    <div className="shieldHalf">
                        <div className="shieldQuater"></div>
                        <div className="shieldQuater"></div>
                    </div>
                </div>

                <div className="content">
                    <div className={this.state.imageLoading ? "pictureBox loading" : "pictureBox"} 
                    onLoad={() => {this.setState({imageLoading: false})}}>
                        <div className="navBtn" onClick={() => {this.selectImage(this.state.currentImageIndex - 1)}}>
                            <i className="fas fa-chevron-left" />
                        </div>
                        {picture}
                        <LoadingIcon isLoading={this.state.imageLoading} />
                        <div className="navBtn" onClick={() => {this.selectImage(this.state.currentImageIndex + 1)}}>
                            <i className="fas fa-chevron-right" />
                        </div>
                    </div>

                    <div className="thumbnails">
                        <div className="buttonContainer">
                            {thumbnailsBtn}
                        </div>
                        {thumbnails}
                    </div>

                        {articleDescriptionDiv}

                </div>
            </div>
         );
    }
}
 
export default Article;