import React, { Component } from "react";
import axios from "axios";
import LoadingIcon from "../../shared/LoadingIcon/LoadingIcon";

class Team extends Component {
  state = {
    activeTeammate: "team",
    thumbnails: [],
    pictures: [],
    descriptions: [],
    currentDescription: "",
    loadingData: "loading",
    loadingPage: "loading"
  };
  currentTeammateDescription = "";

  getThumbnails() {
    axios.get("https://ruje-test.herokuapp.com/teamthumb").then((res, err) => {
      console.log(res);
      const newThumb = res.data
        .sort((a, b) => {
          if (a.name.split(".")[0] > b.name.split(".")[0]) return 1;
          else return -1;
        })
        .map(el => {
          return {
            id: el.id,
            name: el.name.split(".")[1]
          };
        });
      console.log(newThumb);
      this.setState({ thumbnails: newThumb });
    });
  } //end of thumbnails

  getPictures() {
    axios.get("https://ruje-test.herokuapp.com/teampic").then((res, err) => {
      console.log(res);
      const newPics = res.data.map(el => {
        return {
          id: el.id,
          name: el.name.split(".")[0]
        };
      });
      console.log(newPics);
      this.setState({pictures: newPics});
    });
  }

  getDescriptions() {
    axios
      .get("https://ruje-test.herokuapp.com/teammatedesc")
      .then((res, err) => {
        console.log(res);
        const newDesc = res.data.map(el => {
          return {
            id: el.id,
            name: el.name.split(".")[0]
          };
        });
        console.log(newDesc);
        this.setState({ descriptions: newDesc });
      });
  }

  loadDescription() {
    console.log(this.state);
    let descId = this.state.descriptions.find(p => {
        return p.name === this.state.activeTeammate
    }).id;

    axios
      .get("https://ruje-test.herokuapp.com/articlecontent?id=" + descId)
      .then(res => {
        console.log(res);
        if(this.state.currentDescription !== res.data)
            this.setState({
              currentDescription: res.data
              // loadingData: ""
            });
      });
  }

  selectTeammate(name) {
    this.setState({ 
      activeTeammate: name,
      loadingData: "loading"
     });
  }

  onImageLoad() {
    console.log("onImageLoad");
    this.setState({
      loadingData: "",
      loadingPage: ""
    });
  }

  render() {
    let thumbnails = [];
    // let thumbUrl = "https://drive.google.com/thumbnail?authuser=0&sz=w250&id=";
    let picUrl = "https://drive.google.com/uc?export=view&id=";
    let picture = <h1>Brak</h1>;
    // let description = "";

    if (this.state.thumbnails.length === 0) this.getThumbnails();
    if (this.state.descriptions.length === 0) this.getDescriptions();
    else this.loadDescription();

    if (this.state.pictures.length === 0) {
      this.getPictures();
    } else {
      let imgId = this.state.pictures.find(p => {
        // if(p.name == this.state.activeTeammate)
        //     return p.id;
        return p.name === this.state.activeTeammate;
      }).id;

      picture = <img src={picUrl + imgId} alt="" />;
    }

    this.state.thumbnails.forEach(t => {
      thumbnails.push(
        <img
          src={picUrl + t.id}
          alt={t.name}
          key={t.id}
          onClick={() => {
            this.selectTeammate(t.name);
          }}
        />
      );
    });


    return (
      <div className={this.state.loadingPage + " Team"}>
        {/* <fullWidthText></fullWidthText> */}
        <div className="teammateBox">
          <LoadingIcon passedClass={this.state.loadingData} />
          <div className={this.state.loadingData + " pictureBox"} onLoad={() => {this.onImageLoad()}}>{picture}</div>
          <div className={this.state.loadingData + " description " + this.state.activeTeammate}>{this.state.currentDescription}</div>
        </div>
        <div className="teammatesIcons">{thumbnails}</div>
      </div>
    );
  }
}

export default Team;
