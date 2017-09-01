import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
    AsyncStorage
} from 'react-native';
import Util from './../../common/Util';
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;

class UserHome extends Component {
     constructor(props) {
        super(props);
        this.state = {
             result: ''
        };
    }
    RtPwd() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('RtPwd');
         });
    }
    EnterAction() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Enterprise');
         });
    }
    Intro() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Introduction');
        });
    }
    componentDidMount(){
        let _this = this;
        //根据键数组查询保存的键值对
        AsyncStorage.getItem('username', function(errs, result){
          //如果发生错误，这里直接返回（return）防止进入下面的逻辑
          if (!errs) {
              _this.setState(
                  {
                      result: result === null ? '数据已经删除，现在取的是空值' : result
                  }
              )
          }

        });
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{width:deviceWidth,height:deviceHeight/4}}>
                    <Image source={require('./../../assets/imgs/userbg.png')} style={{width:deviceWidth,height:deviceHeight/4,position:'absolute'}}>
                        <View style={[styles.center,styles.m10]}>
                            <Image source={require('./../../assets/imgs/usericon.png')} style={styles.user}/>
                            <Text style={styles.txt}>{this.state.result}</Text>
                        </View>
                    </Image>
                </View>
                <View style={styles.blk}>
                    <TouchableOpacity onPress={this.EnterAction.bind(this)}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('./../../assets/imgs/qyxx.png')} style={styles.icon} />
                            <View style={styles.txt1}><Text style={{fontSize: 18}}>企业信息</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.blk}>
                    <TouchableOpacity onPress={this.RtPwd.bind(this)}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('./../../assets/imgs/xgmm.png')} style={styles.icon} />
                            <View style={styles.txt1}><Text style={{fontSize: 18}}>修改密码</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.blk}>
                    <TouchableOpacity onPress={this.Intro.bind(this)}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('./../../assets/imgs/gnjs.png')} style={styles.icon} />
                            <View style={styles.txt1}><Text style={{fontSize: 18}}>功能介绍</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems:'center',
    },
    m10: {
        marginTop: 10
    },
    icon: {
        width: 36,
        height: 36
    },
    user: {
        width: 80,
        height: 80
    },
    txt: {
        color: 'white',
        fontSize: 18,
        marginTop: 20
    },
    txt1: {
        marginLeft: 18,
        paddingTop: 8,
    },
    blk: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        paddingLeft: 50,
        justifyContent: 'center',
    },
    num: {
        backgroundColor: '#fd5d5d',
        borderRadius: 20,
        color: 'white',
        width: 20,
        height: 20,
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 16,
        position: 'absolute',
        right: 30,
        top: 6,
    }
})
module.exports = UserHome