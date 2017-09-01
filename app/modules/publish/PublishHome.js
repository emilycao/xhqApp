import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

class PublishHome extends Component {
    constructor(props) {
        super(props);
        this.ComplainAction=this.ComplainAction.bind(this);
        this.HelpAction=this.HelpAction.bind(this);
        this.RepairAction=this.RepairAction.bind(this);
        this.PatrolAction=this.PatrolAction.bind(this);
    }
    ComplainAction() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Complain');
         });
    }
    HelpAction() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Help');
         });
    }
    RepairAction() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Repair');
         });
    }
    PatrolAction() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigation.navigate('Patrol');
         });
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.blk}>
                    <View style={styles.blk1}>
                        <TouchableOpacity onPress={this.ComplainAction.bind(this)}>
                            <Image source={require('./../../assets/imgs/tsjy.png')} style={styles.pic}/>
                            <View style={styles.txt}><Text>投诉建议</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blk1}>
                        <TouchableOpacity onPress={this.HelpAction.bind(this)}>
                            <Image source={require('./../../assets/imgs/zxqz.png')} style={styles.pic}/>
                            <View style={styles.txt}><Text>求助咨询</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.blk}>
                    <View style={styles.blk1}>
                        <TouchableOpacity onPress={this.RepairAction.bind(this)}>
                            <Image source={require('./../../assets/imgs/bx.png')} style={styles.pic}/>
                            <View style={styles.txt}><Text>报修</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blk1}>
                        <TouchableOpacity onPress={this.PatrolAction.bind(this)}>
                            <Image source={require('./../../assets/imgs/xlrw.png')} style={styles.pic}/>
                            <View style={styles.txt}><Text>巡逻任务</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    blk: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    blk1: {
        padding: 20
    },
    txt: {
        justifyContent: 'center',
        alignItems:'center',
    },
    pic: {
    width: 80,
    height: 80
    }


})
module.exports = PublishHome