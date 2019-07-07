import React from 'react';
import { ReactComponent as LoadingSvg } from './loadingIcon.svg';

const LoadingIcon = (props) => {
    return ( 
        <div className={props.isLoading ? "loadingIcon loading" : "loadingIcon"}>
            <LoadingSvg />
        </div>
     );
}
 
export default LoadingIcon;