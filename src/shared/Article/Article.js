import React, { Component } from 'react';

class Article extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Article">
                <div className="header">Wikingowie go nienawidzą!</div>
                <div className="pictureBox"></div>
                <div className="content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, quasi. Fugiat soluta, vel reiciendis aliquam autem quos, nisi inventore architecto illum error delectus a ducimus beatae temporibus. Quaerat, magnam rem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero nihil, eveniet velit cumque ab quis hic id beatae, blanditiis in vitae atque ad deleniti minus voluptates, fugiat delectus ipsa!
                    </p>
                </div>
            </div>
         );
    }
}
 
export default Article;