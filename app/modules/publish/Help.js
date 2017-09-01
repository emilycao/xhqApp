import React, {Component,PropTypes } from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    InteractionManager,
    Platform,
    AsyncStorage,
    ScrollView,
    Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import Util from './../../common/Util';
import { toastShort } from './../../common/ToastUtil';
import {HOST,PublishAPI,PublishImgAPI} from './../../common/Request';
import Loading from './../../component/Loading_DD';
var deviceWidth = Util.size.width;

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ '从相册选取', '拍照一张']
const title = '请选择'
var dataToPost = [];
class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            taskname: '',
            conact: '',
            tel: '',
            loading:false
        }
        this.sureSuccesAction=this.sureSuccesAction.bind(this);
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
    };
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

    sureSuccesAction() {
      if(this.state.taskname === ''){
         toastShort('请输入任务名称');
         return;
      }
      if(this.state.conact === ''){
           toastShort('请输入联系人');
           return;
      }
      if(this.state.tel === ''){
         toastShort('请输入联系电话');
         return;
      }
      else if(!/^(1[0-9][0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/ .test(this.state.tel)) {
           toastShort('电话由11数字组成');
           return;
       }
       this.setState({
          loading: true
        });
      AsyncStorage.getItem('userid', (errs, result) => {
      const that = this;
      let formData = new FormData();
      formData.append("tasktype",11);
      formData.append("userid",result);
      formData.append("taskname",this.state.taskname);
      formData.append("conact",this.state.conact);
      formData.append("tel",this.state.tel);
      formData.append("taskdesc",this.state.taskdesc);
      const imgUrl = HOST + PublishImgAPI;
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
        Util.postJson(imgUrl,formData,(responseText) => {
             const json = JSON.parse(responseText);
             if(json.code == 1) {
                    this.setState({
                      loading: false
                    });
                   toastShort(json.msg);
                   goBack()
               }
               else if(json.code == 0) {
                    this.setState({
                      loading: false
                    });
                   toastShort(json.msg);

               }
        })
    });
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
    render() {
        return(
            <View style={styles.container}>
                <ScrollView >
                <View style={[styles.row,{height:60}]}>
                    <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>任务名称<Text style={{color:'red'}}>*</Text></Text></View>
                    <TextInput
                      style={[styles.borderBottom,{flex:1}]}
                      ref={'taskname'}
                      placeholder=""
                      underlineColorAndroid='transparent'
                      onChangeText={(taskname) => this.setState({taskname})}
                      value={this.state.taskname}
                    />
                </View>
                <View style={[styles.row,{height:60}]}>
                    <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系人<Text style={{color:'red'}}>*</Text></Text></View>
                    <TextInput
                      style={[styles.borderBottom,{flex:1}]}
                      ref={'conact'}
                      placeholder=""
                      underlineColorAndroid='transparent'
                      onChangeText={(conact) => this.setState({conact})}
                      value={this.state.conact}
                    />
                </View>
                <View style={[styles.row,{height:60}]}>
                    <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系电话<Text style={{color:'red'}}>*</Text></Text></View>
                    <TextInput
                      style={[styles.borderBottom,{flex:1}]}
                      ref={'tel'}
                      placeholder=""
                      underlineColorAndroid='transparent'
                      onChangeText={(tel) => this.setState({tel})}
                      value={this.state.tel}
                    />
                </View>
                <View style={[styles.row,{height:120}]}>
                    <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>原因</Text></View>
                    <View style={[styles.border,{flex:1}]}>
                        <TextInput
                          multiline={true}
                          style={{height: 120}}
                          ref={'taskdesc'}
                          placeholder=""
                          underlineColorAndroid='transparent'
                          onChangeText={(taskdesc) => this.setState({taskdesc})}
                          value={this.state.taskdesc}
                        />
                    </View>
                </View>
                <View style={[styles.row]}>
                    <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>上传照片</Text></View>
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
                <TouchableOpacity style={{justifyContent:'center',marginTop:13,alignItems:'center'}} onPress={() => {this.sureSuccesAction()}}>
                     <View style={{backgroundColor:'#347aea',height:40,width:deviceWidth,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>确定</Text>
                     </View>
                </TouchableOpacity>
                </ScrollView>
                <Loading visible={this.state.loading}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
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
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems:'center'
    },

})
module.exports = Help
