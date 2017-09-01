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
import NewsItems from './NewsItems'
import Loading from './../../component/Loading_DD';
import {NewsListAPI,HOST} from './../../common/Request'

class TaskHome extends Component {
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
          const url = HOST + NewsListAPI ;
          fetch(url)
          .then((response) => response.json())
          .then((jsonData) => {
          console.log(jsonData)
          if(jsonData.result == null) {
            alert('没有数据')
          }else {
              this.setState({
                  data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(jsonData.result.datas),
                  loading:false
              });
          }
          })
        .catch((error) => {
          alert(error);
        });
    }
    _renderRow(row) {
         return (
            <NewsItems row={row} onPress={this._loadPage.bind(this,row.NEWSID)}/>
         );
    }
    _loadPage(id,title) {
        this.props.navigation.navigate('NewsDetail',{
        NEWSID:id,
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
module.exports = TaskHome