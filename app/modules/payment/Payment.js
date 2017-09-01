import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    WebView
} from 'react-native';
import {HOST,PayDetailAPI} from  './../../common/Request';
import Util from './../../common/Util';
import Loading from './../../component/Loading_DD';

class PayDetail extends React.Component {
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
                    <View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>账单时间</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].year}-{this.state.data.result.attachs1[0].month}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>水费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].watefees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>电费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].electricityfees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>煤气费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].gasfees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>停车费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].stopfees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>物业费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].propertyfees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>滞纳金</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>{this.state.data.result.attachs1[0].latefees}</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>总计应收</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#ff5500'}}>
                            {this.state.data.result.payFloat}
                            </Text></View>
                        </View>
                    </View>
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
        const id = this.props.navigation.state.params.RAWID;
        const that = this;
        const url = HOST + PayDetailAPI + '/' + id;
        Util.get(url,(data) => {
            console.log(data)
            that.setState({
                data: data,
                loading:false
            });
        },(err) => {
            alert(err);
        });
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
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
        alignItems: 'flex-end'
    }
});
module.exports = PayDetail