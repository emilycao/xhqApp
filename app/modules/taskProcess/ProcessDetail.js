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
} from 'react-native';
import {HOST,CheckAPI,ImgHost} from './../../common/Request'
import Util from './../../common/Util'
import { toastShort } from './../../common/ToastUtil';
import Loading from './../../component/Loading_DD';
import moment from 'moment';
var deviceWidth = Util.size.width;

class ProcessDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading:false
        };
    }
    componentDidMount() {
        this.setState({
         loading: true
       });
        const id = this.props.navigation.state.params.taskid;
        const that = this;
        const url = HOST + CheckAPI + '?taskid=' + id;
        console.log(url)
        Util.get(url,(data) => {
          that.setState({
              data: data,
              loading:false
          });
        },(err) => {
          alert(err);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    {
                    this.state.data?
                    <View style={styles.container}>
                        <View>
                            <View style={styles.title}>
                                <Text>任务详情</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>任务名称</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.taskBean.taskname}</Text></View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系人</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.taskBean.conact}</Text></View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系电话</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.taskBean.tel}</Text></View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>发布时间</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{moment(this.state.data.result.taskBean.publishtime).format("YYYY-MM-DD HH:mm:ss")}</Text></View>
                            </View>
                            <View style={{height:100}}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>描述</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.taskBean.taskdesc}</Text></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>图片</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}>{this._showImg(this.state.data.result.taskBean.attachurls)}</View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>点赞数量</Text></View>
                                <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.taskBean.upcount}</Text></View>
                            </View>
                        </View>

                        <View>
                            <View style={[styles.title,{marginTop:20}]}>
                                <Text>任务处理详情</Text>
                            </View>
                            <View>{this._detail()}</View>
                        </View>
                        <View>
                            <View style={[styles.title,{marginTop:20}]}>
                                <Text>评论</Text>
                            </View>
                            <View>{this._commentDetail()}</View>

                        </View>
                    </View>
                    : <Loading visible={this.state.loading}/>
                    }
                </ScrollView >
            </View>
        )
    }
    _showImg(arr) {
        if(arr == null) {
            return (
                <View style={{paddingTop:20,paddingBottom:20}}>
                <Text>没有图片</Text>
                </View>
            );
        }else {
            var allBadge = [];
            for(var i=0;i<arr.length;i++){
                var badge = arr[i];
                var ImgUrl= '"'+ImgHost+badge+'"';
                console.log(ImgUrl)
                allBadge.push(
                <View key={i} >
                    <Image source={{uri:ImgUrl}} style={styles.showImg} resizeMode = "contain" cache='force-cache'/>
                </View>
              );
            }
            return allBadge;
        }
    }
    _detail() {
        const keys = this.state.data.result.taskProcessBeans;
        if(keys === null) {
            return (
            <View style={{paddingTop:20,paddingBottom:20}}>
            <Text>还未出结果，请耐心等待</Text>
            </View>
            );
        }else {
            for(var key in keys){
                return (
                    <View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>处理时间</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{moment(keys[key].processtime).format("YYYY-MM-DD HH:mm:ss")}</Text></View>
                        </View>
                        <View>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>描述</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{keys[key].processdesc}</Text></View>
                        </View>
                        <View>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>图片</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}>{this._showImg(keys[key].attachurls)}</View>
                        </View>
                    </View>
                );
            }

        }
    }
    _commentDetail() {
        const keys = this.state.data.result.taskCommentBeans;
        if(keys === null) {
            return (
            <View style={{paddingTop:20,paddingBottom:20}}>
            <Text>没有评论内容！</Text>
            </View>
            );
        }else{
            for(var key in keys){
                return (
                    <View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>评论人</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{keys[key].commentusername}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>评论时间</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{moment(keys[key].publishtime).format("YYYY-MM-DD HH:mm:ss")}</Text></View>
                        </View>
                        <View>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>评论内容</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{keys[key].content}</Text></View>
                        </View>
                    </View>
                );
            }
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
    backgroundColor: '#f5f5f5',
    borderStyle:'solid',
    borderWidth: Util.pixel,
    borderColor: '#e6e6e6',
    height: 50,
    paddingLeft: 20,
    justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 50,
    },
    m10: {
        marginLeft: 10
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        justifyContent: 'center',
    },
    showImg: {
        width: 200,
        height: 200
    }
})


module.exports = ProcessDetail
