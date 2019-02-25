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


    render() { 
        let articles = [];
                this.state.articlesList.forEach((a) => {
                articles.push(<Article key={a.id} articleId={a.id} />)
                });

        return ( 
            <div className="Travels">
                {articles}
            </div>
         );
    }
}
 
export default Travels;