import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Util from './../../common/Util'
import TaskItems from './TaskProcessItems'
import Loading from './../../component/Loading_DD';
import {TaskProcessListAPI,HOST} from './../../common/Request'

class TaskProcessHome extends Component {
    constructor(props){
        super(props);

        this.state = {
        data: null,
        loading:false
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
              const url = HOST + TaskProcessListAPI + '/' + result;
              fetch(url)
              .then((response) => response.json())
              .then((jsonData) => {
              if(jsonData.result == null) {
                alert('没有数据')
              }else {
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
        if(row.taskstatename === '已处理'){
            return (
                <TaskItems row={row} itemPress={this._itemPress.bind(this, row.taskid)}/>
             );
        }else{
             return (
                <TaskItems row={row}  toCommentAdd={this._toCommentAdd.bind(this, row.taskid)} itemPress={this._itemPress.bind(this, row.taskid)} />
             );
        }
    }
    _toCommentAdd(id) {
        this.props.navigation.navigate(
            'commentAddProcess',
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
module.exports = TaskProcessHome