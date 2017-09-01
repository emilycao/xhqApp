import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Util from './../../common/Util';
import {EnterInfoAPI,HOST} from './../../common/Request'
import Loading from './../../component/Loading_DD';
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;

class Enterprise extends Component {
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
        AsyncStorage.getItem('userid', (errs, result) => {
            const that = this;
            const url =HOST+ EnterInfoAPI + '/' + result;
            Util.get(url,(data) => {
                console.log(JSON.stringify(data))
               // const data = JSON.stringify(data);
                this.setState({
                    data: data,
                    loading:false
                  });
            },(err) => {
              alert(err);
            });
        });
    }
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                {
                this.state.data?
                    <View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>企业名称</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.entname}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>用户名</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.username}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>行业类型</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.industry}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系人</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.contacter}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>联系电话</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.telephone}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>招商类型</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.investtype}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>所属楼栋</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.buildname}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>物业人员</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>{this.state.data.result.estateperson}</Text></View>
                        </View>
                    </View>
                    : <Loading visible={this.state.loading}/>
                }
                </ScrollView>
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
        height: 40,
    },
    m10: {
        marginLeft: 10
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        justifyContent: 'center',
    }
})
module.exports = Enterprise