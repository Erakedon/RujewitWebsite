import React from 'react';
import { ReactComponent as LoadingSvg } from './loadingIcon.svg';

const LoadingIcon = (props) => {
    return ( 
        <div className={props.passedClass + " loadingIcon"}>
            <LoadingSvg />
        </div>
     );
}
 
export default LoadingIcon;