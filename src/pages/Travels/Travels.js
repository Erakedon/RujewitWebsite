import React, { Component } from 'react';
import axios from 'axios';
import Article from '../../shared/Article/Article';


class Travels extends Component {
    state = { 
        articlesList: []
     }


    componentDidMount() {

        axios.get("https://ruje-test.herokuapp.com/articleslist")
        .then(res => {
            console.log("Otrzymano artykuły")
            console.log(res);


            this.setState({
                articlesList: res.data
            })

        });
    }

    // loadArticleData(articlesNumToLoad) {
    //     const numOfLoadedArt = this.state.articlesData.length

    //     for (let i = numOfLoadedArt; i < numOfLoadedArt + articlesNumToLoad; i++) {
    //         if(i >= this.state.articlesList.length) break;
            

            
    //     }
    // }

    linkToArticle(articleId) {
        // this.props.headerPropsRef.history.push(url);
        console.log("open article " + articleId);
        console.log(this.props);
        this.props.history.push("/travels?" + articleId);

    }


    render() { 
        let articles = [];
                this.state.articlesList.forEach((a) => {
                articles.push(<Article clickHandler={() => {this.linkToArticle(a.id)}} key={a.id} articleId={a.id} />)
                });

        return ( 
            <div className="Travels">
                {articles}
            </div>
         );
    }
}
 
export default Travels;