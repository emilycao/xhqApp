import React, {Component} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    AsyncStorage
} from 'react-native';
import Util from './../../common/Util';
import {UpdatePasswordAPI,HOST} from './../../common/Request'
import { toastShort } from './../../common/ToastUtil';
import Loading from './../../component/Loading_DD';
var deviceWidth = Util.size.width;

class RtPwd extends Component {
  constructor(props) {
      super(props);
      this.state = {
       oldpassword: '',
       password: '',
       okpassword: '',
       loading:false
     };
      this.resetSuccesAction=this.resetSuccesAction.bind(this);
      this.buttonChangeState=this.buttonChangeState.bind(this);
    }
    buttonChangeState(position){

    }
    resetSuccesAction(){
        if(this.state.oldpassword === ''){
           toastShort('请输入原密码');
           return;
        }
        if(this.state.password === ''){
          toastShort('请输入新密码');
          return;
        }else if(!/^[a-z0-9]{6,16}$/.test(this.state.password)) {
            toastShort('密码由6-16位英文字母或数字组成');
            return;
        }else if((this.state.password).lenght < 6 ) {
            toastShort('密码至少大于等于6位');
            return;
        }
        if(this.state.okpassword === ''){
         toastShort('请再输入一遍密码');
         return;
        }
        if(this.state.password !== this.state.okpassword){
          toastShort('密码不相符，请重新输入！');
          return;
        }
        this.setState({
          loading: true
        });
        AsyncStorage.getItem('userid', (errs, result) => {
            const that = this;
            let formData = new FormData();
            formData.append("userid",result);
            formData.append("oldPwd",this.state.oldpassword);
            formData.append("newPwd",this.state.password);
            const url = HOST + UpdatePasswordAPI;
            const { goBack } = this.props.navigation;
            Util.postJson(url,formData,(responseText) => {
            var json = JSON.parse(responseText);
            if(json.code === 0) {
                this.setState({
                  loading: false
                });
                toastShort(json.msg);
            }
            else if(json.code === 1) {
                this.setState({
                  loading: false
                });
                toastShort(json.msg);
                goBack()

            }else {
                toastShort('网络问题，保存失败！');
            }
            })
        });
    }
  render() {
    return (
     <View style={styles.container}>
        <View style={{flexDirection:'row',height:60,alignItems:'center'}}>
            <Text style={styles.t16}>原密码</Text>
            <TextInput
            style={styles.txt}
            placeholder="请输入密码"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'oldpassword'}
            multiline={true}
            autoFocus={true}
            secureTextEntry={true}
            onChangeText={(oldpassword) => this.setState({oldpassword})}
            value={this.state.oldpassword}
            />
        </View>
        <View style={{flexDirection:'row',height:60,alignItems:'center'}}>
            <Text style={styles.t16}>新密码</Text>
            <TextInput
            style={styles.txt}
            placeholder="请输入新密码"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'password'}
            multiline={true}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />
        </View>
        <View style={{flexDirection:'row',height:60,alignItems:'center'}}>
            <Text style={styles.t16}>确认密码</Text>
            <TextInput
            style={styles.txt}
            placeholder="请再输入一遍密码"
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            numberOfLines={1}
            ref={'okpassword'}
            multiline={true}
            secureTextEntry={true}
            onChangeText={(okpassword) => this.setState({okpassword})}
            value={this.state.okpassword}
            />
        </View>
        <Text style={{color:'#999',fontSize: 12}}>密码由6-16位英文字母或数字组成</Text>
        <TouchableOpacity onPress={() => {this.resetSuccesAction()}}
                          style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
             <View style={{backgroundColor:'#347aea',height:40,width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white'}}>确认</Text>
             </View>
        </TouchableOpacity>
        <Loading visible={this.state.loading}/>
     </View>
    );
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    },
    t16: {
        fontSize: 16
    },
    txt: {
        height:40,
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical:'center',
        flex:1,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        borderRadius: 20,
    }
});
module.exports =  RtPwd;