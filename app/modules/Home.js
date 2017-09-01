import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  InteractionManager,
  ListView,
  AsyncStorage
} from 'react-native';
import Util from './../common/Util';
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;
class HomeApp extends React.Component {
    constructor(props) {
        super(props);
        this.NoticeList=this.NoticeList.bind(this);
        this.centerHome=this.centerHome.bind(this);
        this.NewsList=this.NewsList.bind(this);
        this.EntList=this.EntList.bind(this);
        this.PropertyManage = this.PropertyManage.bind(this);
    }
    NoticeList() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('NoticeList');
             });
    }
    centerHome() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('UserHome');
             });
    }
    NewsList() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('NewsList');
             });
        }
    EntList() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('EntList');
             });
    }
    PropertyManage() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('PropertyManage');
             });
    }
    render() {
        return (
        <View style={styles.container}>
            <Image source={require('./../assets/imgs/banner/banner.png')} style={styles.page}>
            <TouchableOpacity onPress={this.centerHome.bind(this)}>
                <View style={{alignItems:'flex-end',marginTop:12,marginRight:8}}>
                <Image source={require('./../assets/imgs/user1.png')} style={styles.user_center} />
                </View>
            </TouchableOpacity>
            </Image>
            <View style={styles.menuView}>
                <View style={[styles.layout,styles.bottomLine]}>
                    <View style={[styles.rightLine,styles.area]}>
                        <TouchableOpacity onPress={this.NewsList.bind(this)}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/yqxw.png')} />
                            <Text style={styles.showText}>园区新闻</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.area}>
                        <TouchableOpacity onPress={this.NoticeList.bind(this)}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/yqgg.png')} />
                            <Text style={styles.showText}>园区公告</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.layout}>
                    <View style={[styles.rightLine,styles.area]}>
                        <TouchableOpacity onPress={this.EntList.bind(this)}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/zyqy.png')} />
                            <Text style={styles.showText}>在园企业</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.area}>
                        <TouchableOpacity onPress={this.PropertyManage.bind(this)}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/wygl.png')} />
                            <Text style={styles.showText}>物业管理</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    page: {
        resizeMode: 'stretch',
        width: deviceWidth,
        height: 250,
    },
    menuView: {
        flexDirection: 'column',
        padding:10
    },
    layout: {
        flexDirection: 'row',
        height: (Util.size.height -300)/2
    },
    area: {
        width: (Util.size.width - 22)/2,
        justifyContent:'center',
        alignItems:'center',
    },
    user_center: {
        width: 30,
        height: 30,
    },
    bottomLine: {
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#e3e3e3',
        borderStyle: 'solid',
    },
    rightLine: {
        borderRightWidth: Util.pixel,
        borderRightColor: '#e3e3e3',
        borderStyle: 'solid',
    },
    iconImg: {
        width: 80,
        height: 80,
        paddingBottom: 10
    },
    showText: {
        fontSize: 12,
        color: '#333',
        marginLeft: 12
    },
});
module.exports = HomeApp