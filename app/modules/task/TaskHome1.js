

import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import Util from './../../common/Util'
import TaskItems from './TaskItems'
import Loading from './../../component/Loading_DD';
import {TaskHomeAPI,HOST,LikeAPI} from './../../common/Request'
import { toastShort } from './../../common/ToastUtil';

class TaskHome extends Component {
    constructor(props){
        super(props);

        this.state = {
        data: null,
        upcount:0,
        loading:false,
        };
    }
    render() {
        return (
            <View style={styles.container}>
            <ScrollView >
                {
                    this.state.data?
                    <ListView
                        dataSource={this.state.data}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                        />
                        : <Loading visible={this.state.loading}/>
                }
            </ScrollView>
            </View>
        );
    }
    componentDidMount() {
        this.setState({
         loading: true
       });
        AsyncStorage.getItem('userid', (errs, result) => {
              const url = HOST + TaskHomeAPI + '/' + result;
              console.log(url)
              fetch(url)
              .then((response) => response.json())
              .then((jsonData) => {
              if(jsonData.result == null) {
                alert('没有数据')
              }else {
                  AsyncStorage.setItem('taskid',jsonData.result.taskid,function(errs){console.log('保存成功！')});
                  this.setState({
                      data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(jsonData.result),
                      loading:false
                  });
              }
              })
            .catch((error) => {
              alert(error);
            });


       })
    }
    _renderRow(row) {
         return (
            <TaskItems row={row} liked={this.state.liked} like={this._like.bind(this,row.taskid)} toCommentAdd={this._toCommentAdd.bind(this, row.taskid)} itemPress={this._itemPress.bind(this, row.taskid)}/>
         );
    }
    _like(taskid) {
        const {upcount} = this.state;
        const newLikes = upcount + 1;
        const url = HOST + LikeAPI;
        let formData = new FormData();
        formData.append("taskid",taskid);
        const { goBack } = this.props.navigation;
        Util.postJson(url,formData,(responseText) => {
            const json = JSON.parse(responseText);
            if(json.code == 1) {
                toastShort(json.msg)
                //this.props.navigation.navigate('TaskHome');
                this.setState({
                 upcount : newLikes,
               });
            }
        })
    }
    _toCommentAdd(id,userid) {
        this.props.navigation.navigate(
            'commentAdd',
            {
            taskid:id,
            }
            );
    }
    _itemPress(id) {
        this.props.navigation.navigate(
            'GetPost',
            {
            taskid:id
            }
            );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
module.exports = TaskHome