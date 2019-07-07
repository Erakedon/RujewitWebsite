import React, { Component } from "react";
import axios from "axios";
import LoadingIcon from "../../shared/LoadingIcon/LoadingIcon";

class Team extends Component {
  state = {
    currentTeammate: 0,
    teamData: [],
    pageLoading: true,
    imageLoading: true,

    errorOnLoadingPage: false
  };

  teamRanksOrder = [
    "team",
    "captain",
    "oldteam",
    "piastun",
    "teammate",
    "slave"
  ]

  ranksToDisplayForm = [
    "Drużyna",
    "Dowódca",
    "Drużyna starsza",
    "Piastuni",
    "Drużynnicy młodsi",
    "Niewolni"
  ]

  componentDidMount() {
    this.getTeammatesData();
  }

  getTeammatesData() {
    axios.get("https://ruje-test.herokuapp.com/teammates")
      .then(res => {
        let teamData = res.data.sort((a,b) => {
          const priorityOfA = this.teamRanksOrder.indexOf(a.rank);
          const priorityOfB = this.teamRanksOrder.indexOf(b.rank);

          return priorityOfA > priorityOfB ? 1 : -1;
        });

        this.setState({
          teamData: teamData,
          pageLoading: false
        });

      },err => {
        this.setState({
          pageLoading: false,
          errorOnLoadingPage: true
        });
      });
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

  selectTeammate(index) {
    if(window.pageYOffset > 500)
      window.scrollTo(0,0);

    if(this.state.currentTeammate !== index)
      this.setState({
        currentTeammate: index,
        imageLoading: true
        });
  }

  render() {
    const pictureUrlPrefix = "https://drive.google.com/uc?export=view&id=";

    let teammatesPortraits = [];
    let latestRankDivider = "";

    this.state.teamData.forEach((teammate,index) => {
      if(teammate.rank === "team") return;
      
      if(latestRankDivider !== teammate.rank) {
        latestRankDivider = teammate.rank;
        const displayRank = this.ranksToDisplayForm[this.teamRanksOrder.indexOf(teammate.rank)];
        teammatesPortraits.push(
          <div className="rank" key={teammate.rank}>{displayRank}</div>
        );
      }

      teammatesPortraits.push(
        <img
          className={this.state.currentTeammate === index ? "selected" : ""}
          src={pictureUrlPrefix + teammate.thumbnailId}
          alt={teammate.name}
          key={teammate.name}
          onClick={() => {this.selectTeammate(index)}}/>
      );
    });

    let picture = [];
    let description = "";
    let currentTeammateName = "";

    if(this.state.teamData.length) {
      const currentTeammate = this.state.teamData[this.state.currentTeammate];  
      const teammatePictureUrl = pictureUrlPrefix + currentTeammate.pictureId;

      picture = <img src={teammatePictureUrl} alt={"Picture of " + currentTeammate.name} />;
      description = currentTeammate.description;
      currentTeammateName = currentTeammate.name;
    }

    if(this.state.errorOnLoadingPage)
      return (
        <div className={"Team"}>
          <h2>Niestety, ale ktoś zgrabił tę stronę</h2>
        </div>
      );
    else
      return (
        <div className={"Team"}>
          <div className={"teammateBox " + currentTeammateName}>
            <LoadingIcon isLoading={this.state.imageLoading} />
            <div className={this.state.imageLoading ? "pictureBox loading" : "pictureBox"} 
              onLoad={() => {this.setState({imageLoading: false})}}>{picture}</div>
            <div className={this.state.imageLoading ? "description loading" : "description"}>{description}</div>
          </div>
        <div className="teammatesIcons">{teammatesPortraits}</div>
        </div>
    );
  }
}

export default Team;