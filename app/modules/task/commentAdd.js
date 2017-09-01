import React, { Component } from 'react'
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Alert,
    PixelRatio,
    AsyncStorage
} from 'react-native';
import {HOST,CommentAPI} from './../../common/Request'
import Util from './../../common/Util'
import Touch from './../../component/Touch';
import { toastShort } from './../../common/ToastUtil';
import Loading from './../../component/Loading_DD';
var deviceWidth = Util.size.width;

class CommentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
        loading:false
        }
    }

    render() {
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View>
                    <TextInput
                        ref='commentText'
                        style={styles.textInput}
                        autoFocus={true}
                        multiline={true}
                        placeholder={'请输入评论内容'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => { this.refs['commentText'].value = text } }
                        />
                     <Touch onPress={() => this._saveComment()} style={{justifyContent:'center',marginTop:13,alignItems:'center'}}
                     content={()=>{
                     return(
                      <View style={{backgroundColor:'#347aea',height:40,width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
                         <Text style={{color:'white'}}>确定</Text>
                      </View>
                     )
                     }}
                     />
                </View>
                <Loading visible={this.state.loading}/>
            </View>
        )
    }
    _saveComment() {
        AsyncStorage.getItem('userid', (errs, result) => {
            const id = this.props.navigation.state.params.taskid;
            const text = this.refs['commentText'].value
            if (!text) {
                Alert.alert('提示','请输入内容')
                return
            }
            const url = HOST + CommentAPI;
            let formData = new FormData();
            formData.append("userid",result);
            formData.append("taskid",id);
            formData.append("content",text);
            const { goBack } = this.props.navigation;
            this.setState({
              loading: true
            });
            Util.postJson(url,formData,(responseText) => {
                var json = JSON.parse(responseText);
                if(json.code === 1) {
                    this.setState({
                      loading: false
                    });
                    toastShort(json.msg);
                    goBack()
                }else {
                    this.setState({
                      loading: false
                    });
                    toastShort(json.msg);
                }
            })
        })
    }

}
const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid',
        borderColor: '#ccc',
        height: 200,
        padding: 10,
        fontSize: 14
    },
})


module.exports = CommentAdd
