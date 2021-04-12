import React from 'react';

import './menu-item.styles.scss';

import { withRouter } from "react-router-dom";


/*当想给在同一个<div>标签之下的其它用有额外attribute的元素增加一些效果时，
需用括号和``加以wrap，对于变量还要加上${},   此外div标签有一个style属性，为一个object
属性名为backgroundImage,同样需要用``,${}对变量加以包裹，并使用url()->此方法会返回一个url object(必需）*/
/*单独设置一个classname为background-image的div标签，是因为设置hover效果的时候只想让图放大而非整个menu-item */
const MenuItem = ({title,imageUrl,size,history,match,linkUrl}) => (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}> 
    <div className='background-image'
    style={{backgroundImage: `url(${imageUrl})`}}/> 
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1> 
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
)

export default withRouter(MenuItem);