import React, { Component } from 'react';
import axios from 'axios';

class MainPage extends Component {
    state = { 
        showcasePicturesIdList: [],
        currentPictureIndex: 0,
        pictureFadeOut: false
     }

     nextPictureLoaded = false;
     timeForPictureChange = false;

     componentDidMount() {
        this.loadPictures();
        setTimeout(() => {
            this.pictureChangeByTime();
        }, 6000);
     }
    
    loadPictures() {
        axios.get("https://ruje-test.herokuapp.com/mainpagepictures")
        .then(res => {
            this.setState({
                showcasePicturesIdList: res.data
            });
        });
    }

    pictureLoaded () {
        this.nextPictureLoaded = true;
        if(this.timeForPictureChange) 
            this.changePicture();
    }

    pictureLoadError () {
        this.setState({currentPictureIndex: this.state.currentPictureIndex + 1 < this.state.showcasePicturesIdList.length ? 
            this.state.currentPictureIndex + 1 : 0});
    }

    pictureChangeByTime () {
        this.timeForPictureChange = true;
        if(this.nextPictureLoaded) 
            this.changePicture();
    }

    changePicture() {
        setTimeout(() => {
            this.setState({currentPictureIndex: this.state.currentPictureIndex + 1 < this.state.showcasePicturesIdList.length ? this.state.currentPictureIndex + 1 : 0,
                            pictureFadeOut: false});
            this.nextPictureLoaded = false;
            this.timeForPictureChange = false;
            setTimeout(() => {
                this.pictureChangeByTime();
            }, 6000);
        }, 1000);
        this.setState({
            pictureFadeOut: true
        });
    }

    currentPicture = [];
    nextPicture = [];

    render() { 
        const pictureUrlPrefix = "https://drive.google.com/uc?export=view&id=";

        if(this.state.showcasePicturesIdList.length) {
            this.currentPicture = <img src={pictureUrlPrefix + this.state.showcasePicturesIdList[this.state.currentPictureIndex]} alt="" />
            const nextPictureIndex = this.state.currentPictureIndex + 1 < this.state.showcasePicturesIdList.length ? this.state.currentPictureIndex + 1 : 0;
            this.nextPicture = <img 
            src={pictureUrlPrefix + this.state.showcasePicturesIdList[nextPictureIndex]} alt="" 
            onLoad={() => {this.pictureLoaded()}} onError={() => {this.pictureLoadError()}} />
        }

        return ( 
            <div className="MainPage page">
                <h1>Przybliżamy historię</h1>
                <div className="flexContainer">
                    <div className="description">
                    Drużyna nasza, Najemnikami Rujewita nazwana, lat wiele pracowała w pocie czoła, by zdobyć chwałę i rozgłos, którymi obecnie się cieszy. Po dziś dzień w jej szeregi wstępują jeno najgodniejsi z godnych, najsprawniejsi ze sprawnych  i najroztropniejsi z roztropnych. Jeśliś przeczytał te słowa Czcigodny, wiedz, że nasze najlepsze miecze, łuki i umysły są na Twe usługi. Z ochotą stawimy się na wezwanie każdego, a w boju, krwi nieprzyjaciół i swego potu szczędzić nie zamierzamy. Również, miły Czytelniku, jeśli poszukujesz mężów i niewiast rozumnych, by o swej profesji, życiu i pasji opowiedzieć Twoim najmłodszym scholarom, gotowi jesteśmy do Ciebie przybyć.
                Uprzeź nas jeno o swych zamiarach, posyłająć z wieściami najlepszego gońca.
                    </div>
                    <div className={this.state.pictureFadeOut ? "picturesBox fadeOut" : "picturesBox"}>
                        {this.currentPicture}
                        {this.nextPicture}
                    </div>
                </div>
                <h1>Rekrutacja</h1>
                <div className="flexContainer">
                    <div className="singlePictureBox">
                        <img src="https://drive.google.com/uc?export=view&id=1j4M_g5aNWH9tjG-oJK63ZDdLwCWi8jWw" alt=""/>
                    </div>
                    <div className="description">
                    Rujewit, Pan wojny, pod którego imieniem oraz stanicą Drużynnicy nasi krew przelewają, nie ma sobie równych. Swemi Najemnikami nie czyni byle kmieci. Jeśli myślisz, żeś godny dostąpienia zaszczytu walki i podróży ramię przy ramieniu z najprzedniejszymi z naszych wojowników i najpiękniejszymi z naszych niewiast, poślij do nas!
                    </div>
                </div>
            </div>
         );
    }
}
 
export default MainPage;