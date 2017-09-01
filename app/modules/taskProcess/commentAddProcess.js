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
    Platform,
    Dimensions,
    AsyncStorage,
    DatePickerAndroid,
    TouchableHighlight
} from 'react-native';
import {HOST,TaskProcessCommentAPI} from './../../common/Request'
import Util from './../../common/Util'
import { toastShort } from './../../common/ToastUtil';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import Loading from './../../component/Loading_DD';
var deviceWidth = Util.size.width;

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '从相册选取', '拍照一张']
const title = '请选择'
var dataToPost = [];

class CommentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
        loading:false,
        images: [],
        presetText: '选择日期',
        }
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
    }
    //进行创建时间日期选择器
      async showPicker(stateKey, options) {
        try {
          var newState = {};
          const {action, year, month, day} = await DatePickerAndroid.open(options);
          if (action === DatePickerAndroid.dismissedAction) {
            newState[stateKey + 'Text'] = 'dismissed';
          } else {
            var date = new Date(year, month, day);
            newState[stateKey + 'Text'] = date.toLocaleDateString();
            newState[stateKey + 'Date'] = date;
          }
          this.setState(newState);
        } catch ({code, message}) {
          console.warn(`Error in example '${stateKey}': `, message);
        }
      }
    render() {
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <ScrollView >
                    <View>
                        <View style={[styles.row,{height:120}]}>
                            <View style={[styles.m10,{justifyContent: 'center',width:80}]}><Text style={{fontSize: 15}}>描述</Text></View>
                            <View style={[styles.border,{width:deviceWidth - 80}]}>
                                <TextInput
                                    ref='commentText'
                                    autoFocus={true}
                                    multiline={true}
                                    placeholder={'请输入评论内容'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => { this.refs['commentText'].value = text } }
                                    />
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <View style={[styles.m10,{justifyContent: 'center',width:80}]}><Text style={{fontSize: 15}}>处理日期</Text></View>
                            <View style={[styles.border,{width:deviceWidth - 80}]}>
                            <TouchableHighlight
                                style={styles.button}
                                underlayColor="#a5a5a5"
                                onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}>
                                <Text>{this.state.presetText}</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                        <View style={[styles.row]}>
                            <View style={[styles.m10,{justifyContent: 'center',width:80}]}><Text style={{fontSize: 15}}>上传照片</Text></View>
                            <View >
                                {this.createImageItem()}
                                <ActionSheet
                                  ref={o => this.ActionSheet = o}
                                  title={title}
                                  options={options}
                                  cancelButtonIndex={CANCEL_INDEX}
                                  destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                  onPress={this.handlePress}
                                />
                            </View>
                        </View>
                         <TouchableOpacity onPress={() => this._saveComment()} style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                            <View style={{backgroundColor:'#347aea',height:40,width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white'}}>确定</Text>
                             </View>
                          </TouchableOpacity>
                    </View>
                </ScrollView >
                <Loading visible={this.state.loading}/>
            </View>
        )
    }
    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        if(i == 1) {
        this.pickSingleWithCamera()
        }else {
        this.openPicLib()
        }
    }
    _saveComment() {
        AsyncStorage.getItem('userid', (errs, result) => {
            const id = this.props.navigation.state.params.taskid;
            const userid = result;
            const time = this.state.presetText;
            const text = this.refs['commentText'].value
            if (!text) {
                Alert.alert('提示','请输入内容')
                return
            }
            const url = HOST + TaskProcessCommentAPI;
            let formData = new FormData();
            formData.append("inputer",userid);
            formData.append("userid",userid);
            formData.append("taskid",id);
            formData.append("processdesc",text);
            formData.append("processtime",time);
            if(this.state.images == null){
            alert("没有选择图片");
            } else {
            for(var i = 0;i<this.state.images.length;i++){
                var uri = this.state.images[i].uri;
                var index = uri.lastIndexOf("\/");
                var name = uri.substring(index + 1, uri.length);
                let file = {uri: uri, type: 'multipart/form-data', name: name } ;
                formData.append('file', file);
                }
            }
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
    createImageItem(){
        let mainView;
        if(this.state.images!=null&&this.state.images.length>=9){
            mainView=null;
        }else{
            mainView= <TouchableOpacity onPress={this.showActionSheet}>
            <Image
            source={require('./../../assets/imgs/dotBorder.png')}
            style ={styles.image}>
            <Image source={require('./../../assets/imgs/add.png')} style={{width:40,height:40}}></Image>
            <Text >上传图片</Text>
            </Image>
            </TouchableOpacity>
        }
        return(
            <View>
                <View>
                {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
                </View>
                <View>
                {mainView}
                </View>
            </View>
        )
    }
    //从相机获取图片
    pickSingleWithCamera=()=> { ImagePicker.openCamera({ cropping: false, width: Math.round((Dimensions.get('window').width-20)), height: 300, }).then(image => { dataToPost.push({ uri: image.path, width: image.width, height: image.height, }); this.setState({ images: dataToPost }); }).catch( e => alert(e) ); }
    //从图库或者相机进行获取,因为安卓平台不能进行多图选择，所以，需要区分不同平台
    openPicLib=()=> {
        if(Platform.OS === 'ios'){
            ImagePicker.openPicker({ multiple: true, waitAnimationEnd: false, })
            .then(images => { for (var i=0;i<images.length;i++) {
                dataToPost.push({ uri: images[i].path, width: images[i].width, height: images[i].height, mime: images[i].mime, });
            }
            this.setState({ images: dataToPost }); })
            .catch(e => alert(e) );
            }
        else{
            ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 480,
            compressImageMaxHeight: 640,
            compressImageQuality: 0.5,
            mediaType: 'photo',
            compressVideoPreset: 'MediumQuality'
            })
            .then(image => {
                dataToPost.push({ uri: image.path, width: image.width, height: image.height, mime: image.mime });
                this.setState({ images: dataToPost });
            })
            .catch(e => { alert(e.message ? e.message : e); });
        }
    }
    renderImage(image) {
        return <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={image} />
    }

}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 20,
        marginBottom: 20
    },
    m10: {
        marginLeft: 10
    },
    border: {
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderStyle: 'solid',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems:'center'
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    }
})


module.exports = CommentAdd
