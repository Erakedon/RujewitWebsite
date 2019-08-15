import React, { Component } from 'react';

class Contact extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Contact">
                <div className="singleInfo">
                    <div className="name">Telefon:</div>
                    <a className="data" href="tel:781-096-331">781 096 331</a>
                </div>
                <div className="singleInfo">
                    <div className="name">E-mail:</div>
                    <a className="data" href="mailto:dnrujewit@gmail.com">dnrujewit@gmail.com</a>
                </div>                
                <div className="singleInfo">
                    <div className="name">Rekrutacja:</div>
                    <a className="data" href="mailto:rekrutacja@rujewit.pl">rekrutacja@rujewit.pl</a>
                </div>
            </div>
         );
    }
}
 
export default Contact;