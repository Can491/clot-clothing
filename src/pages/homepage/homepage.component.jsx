import React from 'react';

import Directory from "../../component/directory/directory.component";

import "./homepage.styles.scss";

import { HomePageContainer } from "./homepage.styles";


/*menu-item这一级已经是一个container了，不用在单独设置，而里面的两组标题还需要另外一个container
单独弄一个主页component出来,更加方便管理*/
const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
)

export default HomePage;