 import React, {Component,PropTypes} from 'react';
 import{
     View,
     Text,
     BackAndroid,
     Image,
     StyleSheet,
     InteractionManager,
     TouchableOpacity,
     TextInput,
     Platform,
     ToastAndroid,
     PixelRatio,
     AsyncStorage,
     NetInfo,
     ScrollView
 } from 'react-native';
 //(Platform.OS === 'ios') ? '' : '';
import Home from './../Home';
import {HOST,LoginAPI} from  './../../common/Request';
import { toastShort } from './../../common/ToastUtil';
import Util from './../../common/Util'
import Loading from './../../component/Loading_DD';
import Touch from './../../component/Touch';
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;

class Login extends Component {
    constructor(props) {
       super(props);
       this.state = {
         username: '',
         password: '',
         visible: false,
         isConnected: null,
       };
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change',
             this._handleConnectivityChange
        );
        //检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({isConnected}); }
        );
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }
    _handleConnectivityChange(isConnected) {
       //ToastAndroid.show((isConnected ? 'online' : 'offline'),ToastAndroid.SHORT);
    }
    render() {
       return (
              <View style={styles.container}>
                <ScrollView
                  KeyboardShouldPersistTaps="never"
                  >
                 <Image source={require('./../../assets/imgs/bg.png')} style={{width:deviceWidth,height:deviceHeight/2.5}} />
                 <View >
                     <View style={styles.item_layout}>
                           <Image source={require('./../../assets/imgs/USER.png')}
                                  style={{width:18,height:18,marginLeft:13}}/>
                           <TextInput
                             style={styles.text_input}
                             placeholder="请输入用户名"
                             placeholderTextColor="#ccc"
                             underlineColorAndroid="transparent"
                             numberOfLines={1}
                             ref={'username'}
                             multiline={true}
                             autoFocus={true}
                             onChangeText={(username) => this.setState({username})}
                             value={this.state.username}
                       />
                     </View>
                     <View style={styles.item_layout}>
                           <Image source={require('./../../assets/imgs/Key.png')}
                                  style={{width:18,height:18,marginLeft:13}}/>
                           <TextInput
                             style={styles.text_input}
                             placeholder="请输入密码"
                             placeholderTextColor="#ccc"
                             underlineColorAndroid="transparent"
                             numberOfLines={1}
                             ref={'password'}
                             multiline={true}
                             secureTextEntry={true}
                             onChangeText={(password) => this.setState({password})}
                             value={this.state.password}
                            />
                     </View>
                 </View>
                 <View style={{alignItems:'flex-start',marginTop:13,marginLeft:20}}>
                      <TouchableOpacity style={{marginRight:10}}>
                          <Text style={{fontSize:13,color:'white'}}>找回密码</Text>
                      </TouchableOpacity>
                  </View>
                 <Touch onPress={() => this.clickLoginBtn()}
                 style={styles.btn}
                 content={()=>{return(<Text style={{color:'white'}}>登录</Text>)}} />
                 <Loading visible={this.state.visible}/>
                 </ScrollView>
              </View>
         );
     }
     clickLoginBtn = () => {

        //用户登录
       if(this.state.username === ''){
           toastShort('用户名不能为空...');
           return;
       }
       if(this.state.password === ''){
           toastShort('密码不能为空...');
           return;
       }
       this._getData()
   }
   _getData() {
        this.setState({
            visible: true
          });
        let formData = new FormData();
        formData.append("username",this.state.username);
        formData.append("password",this.state.password);
        let url = HOST + LoginAPI;
       Util.postJson(url,formData,(responseText) => {
           console.log(responseText)
           var json = JSON.parse(responseText);
           if(json.code === 1) {
               this.setState({
                  visible: false
                });
               var key =  [['userid', json.result.userid], ['username', this.state.username],['usertype',json.result.usertype],['estate',json.result.estate]]
               AsyncStorage.multiSet(key, function(errs){console.log('保存成功！')})
               this.onLoginSuccess();
               toastShort(json.msg);
           }else if(json.code === 0) {
               toastShort(json.msg);
               this.setState({
                 visible: false
               });
           }else {
               this.state.isConnected ? toastShort('网络在线') : toastShort('离线')
           }
        })
  }
   //跳转到第二个页面去
   onLoginSuccess(){
    this.props.navigation.navigate(
    'Main'
    );
  }

}
const styles=StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
},
 btn:{
    justifyContent:'center',
    alignItems:'center',
    borderStyle:'solid',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#347aea',
    height: 50,
    margin: 20,
    backgroundColor: '#347aea',
    borderRadius:50
 },
 item_layout:{
     flexDirection:'row',
     height:65,
     alignItems:'center',
     marginLeft:20,
     marginRight:20,
     borderBottomWidth: 1,
     borderBottomColor: '#d8d8d8',
     borderStyle: 'solid',
 },
 text_input: {
    height:40,
    fontSize: 15,
    textAlign: 'left',
    textAlignVertical:'center',
    flex:1,
    color: '#999'
 },
 backgroundImage:{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     width:null,
     width:null,
     //不加这句，就是按照屏幕高度自适应
     //加上这几，就是按照屏幕自适应
     resizeMode:Image.resizeMode.contain,
     //祛除内部元素的白色背景
     backgroundColor:'rgba(0,0,0,0)'
},
});
module.exports = Login