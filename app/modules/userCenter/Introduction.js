import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

class Introduction extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('./../../assets/imgs/computer.png')} style={{width:140,height:140}}/>
                <Text style={styles.txt}>功能介绍</Text>
                <Text>
                    是中国科学院上海高等研究院与汉威电子（SH:300007）共同出资成立的，专注于安全咨询、系统研发、系统集成、数据服务等领域，是中国科科学院上海高等研究院技术创新和成果转化平台，也是国家高新技术企业，上海市双软认证企业，上海市优秀软件开发单位及上海战略新兴项目入选单位。
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
    txt: {
        lineHeight: 45,
        fontSize: 18
    }
})
module.exports = Introduction