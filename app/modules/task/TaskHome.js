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
    RefreshControl,
    ActivityIndicator
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
        data: [],
        dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
        loading:false,
        };
    }
    render() {
        return (
            <View style={styles.container}>
            <ScrollView >
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh.bind(this)}
                            title="正在加载中……"
                            color="#ccc"
                        />
                    }
                />
                <Loading visible={this.state.loading}/>
            </ScrollView>
            </View>
        );
    }
    componentDidMount() {
        this._onRefresh();
    }
    _onRefresh() {
        this.setState({
            loading: true
        });
        AsyncStorage.getItem('userid', (errs, result) => {
              const url = HOST + TaskHomeAPI + '/' + result;
              fetch(url)
              .then((response) => response.json())
              .then((jsonData) => {
              console.log(jsonData)
              if(jsonData.result == null) {
                alert('没有数据')
              }else {
                  AsyncStorage.setItem('taskid',jsonData.result.taskid,function(errs){console.log('保存成功！')});
                  this.setState({
                      data: jsonData.result,
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
            <TaskItems row={row} like={this._like.bind(this,row.taskid)} toCommentAdd={this._toCommentAdd.bind(this, row.taskid)} itemPress={this._itemPress.bind(this, row.taskid)}/>
         );
    }
    _like(taskid) {
        const url = HOST + LikeAPI;
        let formData = new FormData();
        formData.append("taskid",taskid);
        Util.postJson(url,formData,(responseText) => {
            const json = JSON.parse(responseText);
            if(json.code == 1) {
                toastShort(json.msg)
                this._onRefresh()
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