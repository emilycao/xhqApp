import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {PaylsitAPI,HOST} from './../../common/Request'
import PayItems from './PayItems'
import Util from './../../common/Util'
import Loading from './../../component/Loading_DD';

class PayHome extends Component {
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
                       enableEmptySections = {true}
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
       AsyncStorage.getItem('userid', (errs, result) => {
          const url = HOST + PaylsitAPI + '/' + result;
          fetch(url)
          .then((response) => response.json())
          .then((jsonData) => {
          this.setState({
              data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(jsonData.result.datas),
              loading:false
          });
          })
          .catch((error) => {
            alert(error);
          });

       })
   }
   _renderRow(row) {
        return (
           <PayItems row={row} onPress={this._loadPage.bind(this,row.RAWID)} />
        );
   }
   _loadPage(id) {
       this.props.navigation.navigate('Payment',{
       RAWID:id
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
module.exports = PayHome