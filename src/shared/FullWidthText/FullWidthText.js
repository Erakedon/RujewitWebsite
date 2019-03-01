import React, { Component } from 'react';

// const FullWidthText = (props) => {
//     return ( 
//         <div className={props.classes + " FullWidthText"}>
//             {props.children}
//         </div>
//      );
// }
 
// export default FullWidthText;


class FullWidthText extends Component {
    state = {  }
    render() { 
        return ( 
            <div className={this.props.classes + " FullWidthText"}>
            {this.props.children}
        </div>
         );
    }
}
 
export default FullWidthText;