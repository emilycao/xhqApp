import React from 'react'

import {
    StyleSheet,
    Button
} from 'react-native';
import LeftIcon from './LeftIcon'

 StackOptions = ({navigation}) => {
    let {state,goBack} = navigation;

    // 用来判断是否隐藏或显示header
    const headerStyle = {backgroundColor:'#347aea'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {color:'white',fontWeight:'500',alignSelf:'center'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                        <LeftIcon/>
                        }
            onPress={()=>{goBack()}}
        />
    );
    let headerRight;
    if (state.params.headerRight){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params.isVisible === true){
        header = null;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight}
};
module.exports = StackOptions