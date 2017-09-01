import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Util from './../../common/Util';
import moment from 'moment';


class NoticeItems extends React.Component {
    render() {
        const row = this.props.row;
        return (
            <TouchableOpacity style={[styles.row,styles.item]} {...this.props}>
                <View style={styles.content}>
                    <View>
                        <Text style={{fontSize: 16}} numberOfLines={1}>{row.TITLE}</Text>
                        <Text>
                        {
                        moment(row.UPDATETIME).format("YYYY-MM-DD")
                        }
                        </Text>
                    </View>
                </View>
                <View>
                    <Image source={require('./../../assets/imgs/arrowR.png')} style={styles.arrow} />
                </View>
            </TouchableOpacity>
        );
    }
};

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    item: {
        height: 60,
        borderBottomWidth: Util.pixel,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#ccc'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        paddingLeft: 12,
        justifyContent:'center'
    },
    arrow: {
        width: 8,
        height: 14,
        marginTop: 20,
        marginRight: 20
    },
});
module.exports = NoticeItems