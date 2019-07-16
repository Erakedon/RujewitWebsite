import React, { Component } from 'react';
import axios from 'axios';
import Article from '../../shared/Article/Article';

class Travels extends Component {
    state = { 
        articlesList: []
     }

    articlesJSXElements = [];
    articlesHtmlElements = [];
    articlesElementsVisibility =[];
    firstNotVisibleArticleElement = 0;

    articlesPerQuery = 8;
    waitingForResponse = false;

    onScrollFunctionReference = {};

    componentDidMount() {
        this.getArticles(4);
        this.onScrollFunctionReference = () => {
            this.checkArticlesVisibility();
        }
        document.addEventListener("scroll", this.onScrollFunctionReference);
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.onScrollFunctionReference);
    }

    componentDidUpdate() {
        this.getArticlesElementsPosition();
        this.checkArticlesVisibility();
    }

    checkArticlesVisibility() {
        const scrollPosition = document.documentElement.scrollTop + window.innerHeight - 200;
        let updateIsNeeded = false;

        for (let i = this.firstNotVisibleArticleElement; 
            i < this.articlesHtmlElements.length; 
            i++) {
                const pos = this.articlesHtmlElements[i].offsetTop;
                this.articlesElementsVisibility[i] = pos < scrollPosition;
                if(!this.articlesElementsVisibility[i]) break;//if this article is not visible, the next won't be either
                    updateIsNeeded = true;
            }
            if(updateIsNeeded) this.forceUpdate();
    }

    checkIfQueryForNextArticlesIsNeeded() {
        if(this.state.articlesList.length < this.firstNotVisibleArticleElement + 2 && !this.waitingForResponse)
            this.getArticles()
    }

    getArticlesElementsPosition() {
        this.articlesHtmlElements = document.querySelectorAll(".Article");
    }

    getArticles(articlesToGet) {
        this.waitingForResponse = true;
        const firstResultId = this.state.articlesList.length;
        const numberOfRequestetArticles = articlesToGet || this.articlesPerQuery;
        axios.get("https://ruje-test.herokuapp.com/articles?firstResultId=" + firstResultId 
                    + "&amountOfResults=" + numberOfRequestetArticles)
        .then(res => {
            this.waitingForResponse = false;
            let newArticlesList =  [];
            this.state.articlesList.forEach(article => newArticlesList.push(article));
            res.data.articles.forEach(article => newArticlesList.push(article));

            this.setState({
                articlesList: newArticlesList
            });
        }, err => {
            this.waitingForResponse = false;
        });
    }

    render() { 
        for(let i = this.firstNotVisibleArticleElement; i < this.state.articlesList.length; i++) {

            const article = this.state.articlesList[i];
            const visibility = this.articlesElementsVisibility[i] ? true : false;//articlesElementsVisibility might happen to be NULL
            
            this.articlesJSXElements[i] = (<Article 
                key={i}
                id={i}
                visible = {visibility}
                name={article.name}
                description={article.description ? article.description : ""}
                images={article.images}/>);
            if(visibility) this.firstNotVisibleArticleElement = i + 1;
            this.checkIfQueryForNextArticlesIsNeeded();
        }

        return ( 
            <div className="Travels">
                {this.articlesJSXElements}
            </div>
         );
    }
}
 
export default Travels;