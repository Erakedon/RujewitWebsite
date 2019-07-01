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

  teamRanksList = [
    "captain",
    "oldteam",
    "piastun",
    "teammate",
    "slave"
  ]

  componentDidMount() {
    this.getThumbnails();
    this.getDescriptions();
    this.getPictures();
  }

  getThumbnails() {
    axios.get("https://ruje-test.herokuapp.com/teamthumb")
    .then(res => {
      const newThumb = res.data
        .sort((a, b) => {
          const valueA = this.teamRanksList.indexOf(a.name.split(".")[1]);
          const valueB = this.teamRanksList.indexOf(b.name.split(".")[1]);

          if(valueA > valueB) return 1;
          else return -1;
        })
        .map(el => {
          return {
            id: el.id,
            name: el.name.split(".")[0]
          };
        });
      this.setState({ thumbnails: newThumb });
    });
  }

  getPictures() {
    axios.get("https://ruje-test.herokuapp.com/teampic")
    .then(res=> {
      const newPics = res.data.map(el => {
        return {
          id: el.id,
          name: el.name.split(".")[0]
        };
      });
      this.setState({pictures: newPics});
    });
  }

  getDescriptions() {
    axios
      .get("https://ruje-test.herokuapp.com/teammatedesc")
      .then(res => {
        const newDesc = res.data.map(el => {
          return {
            id: el.id,
            name: el.name.split(".")[0]
          };
        });
        this.setState({ descriptions: newDesc });
        this.loadDescription("team");
      });
  }

  loadDescription(teammateName) {
    const descSearchedElement = this.state.descriptions.find(p => {
        return p.name === teammateName
    });
    if(!descSearchedElement) return
    const descId = descSearchedElement.id;

    axios
      .get("https://ruje-test.herokuapp.com/articlecontent?id=" + descId)
      .then(res => {
        if(this.state.currentDescription !== res.data)
            this.setState({
              currentDescription: res.data
            });
      });
  }

  selectTeammate(name) {
    this.loadDescription(name);
    this.setState({ 
      activeTeammate: name,
      loadingData: "loading"
     });
  }

  onImageLoad() {
    this.setState({
      loadingData: "",
      loadingPage: ""
    });
  }

  render() {
    let thumbnails = [];
    const picUrl = "https://drive.google.com/uc?export=view&id=";
    let picture = [];

    if (this.state.pictures.length > 0) {
      let imgId = this.state.pictures.find(p => {
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
