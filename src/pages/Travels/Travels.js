import React, { Component } from 'react';
import axios from 'axios';
import Article from '../../shared/Article/Article';


class Travels extends Component {
    state = { 
        articlesList: [],
        currentNumberOfArticles: 4
     }

     articlesPerLoad = 4;
     currentScrollHeightCheckopint = 0;


    componentDidMount() {
        this.getArticles();
        this.setArticleAddingEvent();
    }

    setArticleAddingEvent() {
        document.addEventListener("scroll",ev => {
            const docEl = document.documentElement;
            console.log(docEl.scrollTop + window.innerHeight, docEl.scrollHeight);
            const downPointOvUserView = docEl.scrollTop + window.innerHeight;
            const downOfThePage = docEl.scrollHeight;
            const triggerValue = 200;

            if(downPointOvUserView > downOfThePage - triggerValue && 
                downPointOvUserView > this.currentScrollHeightCheckopint) {
                this.currentScrollHeightCheckopint = downOfThePage + triggerValue;
                this.addMoreArticlesToPage();
            }
        });
    }

    addMoreArticlesToPage() {
        console.log("addingMoreArticles");
        // this.currentNumberOfArticles += this.articlesPerLoad;
        this.setState({currentNumberOfArticles: this.state.currentNumberOfArticles + this.articlesPerLoad});
    }

    getArticles() {
        axios.get("https://ruje-test.herokuapp.com/articleslist")
        .then(res => {
            console.log("Otrzymano artykuły")
            console.log(res);


            this.setState({
                articlesList: res.data
            })

        });
    }

    linkToArticle(articleId) {
        // this.props.headerPropsRef.history.push(url);
        // console.log("open article " + articleId);
        console.log(this.props);
        this.props.history.push(this.props.history.location.pathname + "/article?" + articleId);

    }


    render() { 
        let articles = [];
                // this.state.articlesList.forEach((a,i) => {
                //     if(i == 6) return;
                // articles.push(<Article clickHandler={() => {this.linkToArticle(a.id)}} key={a.id} articleId={a.id} />)
                // });
            for (let i = 0; i < this.state.currentNumberOfArticles && i < this.state.articlesList.length; i++) {
                const article = this.state.articlesList[i];
                articles.push(<Article 
                clickHandler={() => {this.linkToArticle(article.id)}} 
                key={article.id} 
                articleName={article.name}
                articleId={article.id} />)
                
            }

        return ( 
            <div className="Travels">
                {articles}
            </div>
         );
    }
}
 
export default Travels;