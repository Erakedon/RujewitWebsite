import React, { Component } from 'react';
import { ReactComponent as Leftover1 } from './leftout_1.svg';
import { ReactComponent as Leftover2 } from './leftout_2.svg';
import { ReactComponent as Leftover3 } from './leftout_3.svg';
import { ReactComponent as Leftover4 } from './leftout_4.svg';



class HeaderBg extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="HeaderBg">
                <div className="leftoverSpace" />
                <div className="leftoverSpace" />
                <Leftover1 className="leftover1" />
                <div className="leftoverSpace" />
                <Leftover2 className="leftover2" />
                <div className="leftoverSpace" />
                <Leftover3 className="leftover3" />
                <div className="leftoverSpace" />
                <Leftover4 className="leftover4" />
                <div className="leftoverSpace" />
                <Leftover1 className="leftover1" />
                <div className="leftoverSpace" />
                <Leftover4 className="leftover4" />
                <div className="leftoverSpace" />
            </div>
         );
    }
}
 
export default HeaderBg;