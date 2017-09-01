import  React,{ Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
const isAndroid = Platform.OS === 'android'

{/**按钮防重复提交组件*/}
export default class Touch extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isDisable:false,//是否被禁用
        };
    }

    componentWillMount() {

    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }

    static contextTypes = {
        navigator: PropTypes.object,
    };

    ToPress = async ()=>{
        const {onPress} = this.props;
        onPress&&onPress()
        await this.setState({isDisable:true})//防重复点击
        this.timer = setTimeout(async()=>{
            await this.setState({isDisable:false})//1.5秒后可点击
        },1500)
    }

    render(){
        const {style,content} = this.props
        return(
            <TouchableOpacity
                disabled={this.state.isDisable}
                activeOpacity={0.85}
                style={style?style:{}}
                onPress={this.ToPress}
                {...this.props}
            >
                {content && content()}

            </TouchableOpacity>
        )
    }
}