import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {EntListAPI,HOST} from './../../common/Request'
import Util from './../../common/Util'
import EntItems from './EntItems'
import Loading from './../../component/Loading_DD';

class EntList extends Component {
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
                <ScrollView style={styles.flex_1}>
                    {
                        this.state.data?
                        <ListView
                            dataSource={this.state.data}
                            renderRow={this._renderRow.bind(this)}
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
            const url = HOST + EntListAPI ;
            fetch(url)
                .then((response) => response.json())
                .then((jsonData) => {
                  const json = JSON.stringify(jsonData);
                  this.setState({
                    data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(jsonData.result),
                    loading: false
                  });
                })
                .catch((error) => {
                  alert(error);
                });
        }
        _renderRow(row) {
             return (
                <EntItems row={row}  />
             );
        }
        _loadPage(id) {
            this.props.navigation.navigate('EntDetail',{
            entid:id
            });
        }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
     },
    listText: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
    }
})
module.exports = EntList