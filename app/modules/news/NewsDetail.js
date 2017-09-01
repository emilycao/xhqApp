import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    WebView
} from 'react-native';
import {HOST,NewsDetailAPI} from  './../../common/Request';
import Util from './../../common/Util';
import moment from 'moment';
import Loading from './../../component/Loading_DD';

class PropertyDetail extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            data: null,
            height:500,
            loading:false
        };
    }
    render() {
        return (
            <View style={styles.container}>
                    {
                    this.state.data?
                    <ScrollView >
                    <View>
                        <View style={styles.title}>
                            <Text style={{fontSize:16}}>{this.state.data.result.title}</Text>
                            <Text>
                            {moment(this.state.data.result.updatetime).format("YYYY-MM-DD")}
                            </Text>
                        </View>
                        <View style={{height:this.state.height}}>
                            <WebView
                            source={{html: `<!DOCTYPE html><html><body>${this.state.data.result.content}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                            style={{flex:1}}
                            bounces={false}
                            scrollEnabled={false}
                            automaticallyAdjustContentInsets={true}
                            contentInset={{top:0,left:0}}
                            onNavigationStateChange={(title)=>{
                              if(title.title != undefined) {
                                this.setState({
                                  height:(parseInt(title.title)+20)
                                })
                              }
                            }}
                            >
                            </WebView>
                        </View>
                    </View>
                    </ScrollView>
                    : <Loading visible={this.state.loading}/>
                    }
            </View>
        );
    }
    componentDidMount() {
        this.setState({
          loading: true
        });
        const id = this.props.navigation.state.params.NEWSID;
        const that = this;
        const url = HOST + NewsDetailAPI + '/' + id;
        Util.get(url,(data) => {
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
        backgroundColor: 'white',
     },
    title: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        borderStyle: 'solid',
    },
    titleFont: {
        fontSize:20,
        color: '#333'
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000d22'
    }
});
module.exports = PropertyDetail