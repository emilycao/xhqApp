import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Util from './../../common/Util';
import moment from 'moment';

var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;

class TaskProcessItems extends Component {
    render() {
        const { row, itemPress, toCommentAdd } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.shadow}>
                    <View style={[styles.con,{flexDirection:'row'}]}>
                        <Image source={require('./../../assets/imgs/computer.png')} style={styles.img}/>
                        <View style={{width: deviceWidth-140 }}>
                            <View style={{flexDirection:'row',marginBottom:6}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16}}>{row.taskname}</Text>
                                </View>
                                <View style={{flex:1,justifyContent:'flex-end'}}>
                                    <Text style={{fontSize: 16}}>
                                    {
                                    moment(row.publishtime).format("YYYY-MM-DD")
                                    }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        {this._status(row.taskstatename,toCommentAdd,itemPress)}
                    </View>
                </View>
            </View>
        );
    }
    _status(name,toCommentAdd,itemPress){
        if(name === '已处理') {
            return (
                 <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.f1}>
                        <TouchableOpacity  onPress={itemPress}>
                            <Text style={styles.txt}>查看</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.f1}>
                        <View style={{backgroundColor:'#347aea',height:30,width:60,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>{name}</Text></View>
                    </View>
                </View>

            );
        }else {
            return(
                 <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.f1}>
                        <TouchableOpacity onPress={toCommentAdd}>
                            <Text style={styles.txt}>处理</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.f1}>
                        <TouchableOpacity  onPress={itemPress}>
                            <Text style={styles.txt}>查看</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.f1}>
                        <View style={{backgroundColor:'#347aea',height:30,width:60,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>{name}</Text></View>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    shadow: {
        borderRadius: 3,
        borderWidth:1,
        borderColor:'#e8e8e8',
        shadowColor:'black',
        shadowOffset:{h:0,w:6},
        shadowRadius:3,
        shadowOpacity:0.8,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    f1: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    img: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    con: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
        justifyContent: 'center',
        padding: 10
    },
    txt: {
    color: '#ff6526'
    },
    txted: {
    color: '#ccc'
    }
})
module.exports = TaskProcessItems
