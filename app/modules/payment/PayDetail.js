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

class PayDetail extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            data: null
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>账单时间</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>111</Text></View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.m10,{justifyContent: 'center',width:100}]}><Text style={{fontSize: 15}}>水费</Text></View>
                            <View style={[styles.borderBottom,{flex:1}]}><Text style={{color:'#999'}}>111</Text></View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
};
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
});
module.exports = PayDetail