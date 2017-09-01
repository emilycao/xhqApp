import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
} from 'react-native';
import Util from './../../common/Util';
import moment from 'moment';
import {ImgHost} from './../../common/Request'
var deviceWidth = Util.size.width;
var deviceHeight = Util.size.height;

class NewsItems extends Component {
    render() {
        const {row} = this.props
        return (
            <TouchableOpacity {...this.props}>
                <View style={[styles.con,{flexDirection:'row'}]}>
                    {this._img(row)}
                    <View style={{width: deviceWidth-140 }}>
                        <View style={{flexDirection:'column',marginBottom:6}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 16}} numberOfLines={1}>{row.TITLE}</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'flex-end'}}>
                                <Text style={{fontSize: 16,color:'#999'}}>
                                {
                                moment(row.UPDATETIME).format("YYYY-MM-DD")
                                }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    _img(id) {
    const imgUrl = ImgHost + id.ATTACHURL;
    console.log(imgUrl)
    return(
    <Image source={{uri:imgUrl}} style={styles.img} />
    )

    }
}
const styles = StyleSheet.create({
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
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#e3e3e3',
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
module.exports = NewsItems