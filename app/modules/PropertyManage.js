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
import { StackNavigator } from 'react-navigation';
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;
class PropertyManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             usertype: '',
             estate:''
        };
        this.findProAction=this.findProAction.bind(this);
        this.complainAction=this.complainAction.bind(this);
        this.centerHome=this.centerHome.bind(this);
        this.TaskHome=this.TaskHome.bind(this);
        this.PayHome=this.PayHome.bind(this);
        this.TaskProcessHome = this.TaskProcessHome.bind(this);
    }
    findProAction() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('PropertyHome');
             });
    }
    complainAction() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('PublishHome');
             });
    }
    centerHome() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('UserHome');
             });
    }
    TaskHome() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('TaskHome');
             });
        }
    PayHome() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('PayHome');
             });
    }
    TaskProcessHome() {
        InteractionManager.runAfterInteractions(() => {
               this.props.navigation.navigate('TaskProcessHome');
             });
    }
    componentDidMount(){
        let _this = this;
        const key = ['usertype','estate']
        AsyncStorage.multiGet(key, function(errs, result){
        if (!errs) {
          _this.setState({
              usertype: (result[0][1]!=null)?result[0][1]:'',
              estate: (result[1][1]!=null)?result[1][1]:''
            });
        }

        });
      }
    HomeView () {
        const usertype = this.state.usertype;
        const estate = this.state.estate;
        let mainView;
        if(usertype == 'PAR' && estate == 1) {
            mainView =
                <View style={styles.layout}>
                    <TouchableOpacity onPress={this.TaskProcessHome.bind(this)}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/rwgl.png')} />
                            <View style={styles.txt}><Text style={styles.showText}>任务管理</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
        }else if((usertype == 'ENT' || usertype == 'PAR') && estate == 0 ) {
            mainView =
                <View>
                    <View style={styles.layout}>
                        <TouchableOpacity onPress={this.complainAction.bind(this)}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={styles.iconImg} source={require('./../assets/imgs/fbrw.png')} />
                                <View style={styles.txt}><Text style={styles.showText}>发布任务</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.layout}>
                        <TouchableOpacity onPress={this.TaskHome.bind(this)}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={styles.iconImg} source={require('./../assets/imgs/rwgl.png')} />
                                <View style={styles.txt}><Text style={styles.showText}>任务管理</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.layout}>
                        <TouchableOpacity onPress={this.PayHome.bind(this)}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={styles.iconImg} source={require('./../assets/imgs/wyjf.png')} />
                                <View style={styles.txt}><Text style={styles.showText}>业务缴费</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        }
        return (
            <View>
            {mainView}
            </View>
        );
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.menuView}>
                <View style={styles.layout}>
                    <TouchableOpacity onPress={this.findProAction.bind(this)}>
                        <View style={{flexDirection:'row'}}>
                            <Image style={styles.iconImg} source={require('./../assets/imgs/wygg.png')} />
                            <View style={styles.txt}><Text style={styles.showText}>业务公告</Text></View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>{this.HomeView()}</View>
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
    menuView: {
        flexDirection: 'column',
        marginTop: 10,
    },
    layout: {
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#e3e3e3',
        borderStyle: 'solid',
        height: 80,
        justifyContent:'center',
        paddingLeft: 15
    },
    iconImg: {
        width: 60,
        height: 60,
        paddingBottom: 10
    },
    txt: {
        justifyContent:'center',
        paddingLeft: 20
    },
    showText: {
        fontSize: 14,
        color: '#333',
    }
});
module.exports = PropertyManage