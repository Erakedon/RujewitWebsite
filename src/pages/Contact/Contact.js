import React, { Component } from 'react';
import FullWidthText from './../../shared/FullWidthText/FullWidthText';

class Contact extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Contact">

            <FullWidthText>
                <p><b>Telefon:</b> 781 096 331</p>
                <p><b>E-mail:</b> dnrujewit@gmail.com</p>
                <p><b>Rekrutacja:</b> rekrutacja@rujewit.pl</p>
            </FullWidthText>


            </div>
         );
    }
}
 
export default Contact;