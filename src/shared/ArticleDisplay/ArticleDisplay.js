import React, { Component } from "react";
import axios from "axios";
import LoadingIcon from './../LoadingIcon/LoadingIcon';

class ArticleDisplay extends Component {
  state = {
    title: "",
    content: "",
    imageIdList: [],
    display: "none",
    currentImage: 0,
    pageLoading: "loading",
    imageLoading: "loading"
  };

  loadImage(imageId, onListId) {
    let imageToDownload = new Image();
    imageToDownload.onload = () => {
      const newState = {
        imageSource: imageToDownload.src
      };
      this.setState(newState);
    };
  }

  checkDisplay() {
    if (this.props.history.location.search === "") {
      return "hiddenArticle";
    } else {
      return "ArticleDisplay ";
    }
  }

  getArticle() {
    console.log(this.props);
    let newState = {
      title: "",
      content: "",
      imageIdList: []
    };

    axios
      .get(
        "https://ruje-test.herokuapp.com/article?id=" +
          this.props.history.location.search.slice(1)
      )
      .then((res, err) => {
        if (!res.data) {
          this.props.history.push("error");
        } else {
          console.log(res);

          //   axios
          //     .get(
          //       "https://ruje-test.herokuapp.com/filemetadata?id=" +
          //         this.props.history.location.search.slice(1)
          //     )
          //     .then((res, err) => {
          //         console.log(res);
          //         console.log(err || "brak bledu");
          //         if(res.data) {
          //             this.setState({title: res.data[0].name})
          //         }
          //         else console.log("nie ma tytulu");
          //     });

          res.data.forEach(el => {
            switch (el.mimeType) {
              case "image/jpeg":
                newState.imageIdList.push(el.id);
                break;
              case "application/vnd.google-apps.document":
                console.log("Znaleziono Dżejsona!");
                newState.title = el.name;

                axios
                  .get(
                    "https://ruje-test.herokuapp.com/articlecontent?id=" + el.id
                  )
                  .then(res => {
                    newState.content = res.data;
                    this.setState(newState);
                  });
                break;
              default:
                break;
            }
          });
          if (newState.title === "") this.props.history.push("error");
          console.log(newState);
          this.setState(newState);
        }
      });
  }

  closeView() {
    let newUrl = this.props.history.location.pathname;
    this.props.history.push("/" + newUrl.split("/")[1]);
  }

  selectImage(id) {
    console.log(id);
    this.setState({ 
      currentImage: id,
      imageLoading: "loading"
     });
  }

  showPicturesList() {
    if (this.state.imageIdList.length > 1) return {};
    else return { display: "none" };
  }

  onImageLoad() {
    this.setState({imageLoading: ""})
  }

  render() {
    console.log("rendering article display");
    if (this.state.title === "") this.getArticle();

    let imagesList = [];
    let thumbUrl = "https://drive.google.com/thumbnail?authuser=0&sz=w320&id=";
    this.state.imageIdList.forEach((p, index) => {
      imagesList.push(
        <img
        className={index === this.state.currentImage ? "active" : ""}
          src={thumbUrl + p}
          key={p}
          alt=""
          onClick={i => {
            this.selectImage(index);
          }}
        />
      );
    });
    let mainImage = [];
    mainImage.push(<LoadingIcon 
    passedClass={this.state.imageLoading} 
    key="loading" />);

    if(this.state.imageIdList.length > 0) {
      mainImage.push(
        <img
              className={this.state.imageLoading}
              src={
                "https://drive.google.com/uc?export=view&id=" +
                this.state.imageIdList[this.state.currentImage]
              }
              alt=""
              key="picture"
              onLoad={() => {this.onImageLoad()}}
            />
      )
    }

    return (
      <div
        className={this.checkDisplay()}
        onClick={() => {
          this.closeView();
        }}
      >
        <div
          className="articleBox"
          onClick={event => {
            event.stopPropagation();
          }}>
          <button onClick={() => {this.closeView();}}>X</button>
          <div className="title">{this.state.title}</div>
          <div className="pictureBox">
            {mainImage}
          </div>
          <div className="picturesList" style={this.showPicturesList()}>
            {imagesList}
          </div>
          <div className="content">{this.state.content}</div>
        </div>
      </div>
    );
  }
}

export default ArticleDisplay;
