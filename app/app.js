import React from 'react';
import {
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
/*import navigation from './common/Navigation'*/

import LoginScreen from './modules/login/login';
import MainScreen from './modules/Home';
import PropertyManage from './modules/PropertyManage';
import PropertyHome from './modules/property/PropertyHome';
import PropertyDetail from './modules/property/PropertyDetail';
//园区企业列表
import EntList from './modules/parkIn/EntList';
import EntDetail from './modules/parkIn/EntDetail';
//园区新闻
import NewsList from './modules/news/NewsList';
import NewsDetail from './modules/news/NewsDetail';
//园区公告新闻
import NoticeList from './modules/notice/NoticeList';
import NoticeDetail from './modules/notice/NoticeDetail';
//发布公告
import PublishHome from './modules/publish/PublishHome'
import Complain from './modules/publish/Complain'
import Help from './modules/publish/Help'
import Repair from './modules/publish/Repair'
import Patrol from './modules/publish/Patrol'
//个人中心
import UserHome from './modules/userCenter/UserHome'
import RtPwd from './modules/userCenter/RtPwd'
import Enterprise from './modules/userCenter/Enterprise'
import Introduction from './modules/userCenter/Introduction'

//我的任务管理
import TaskHome from './modules/task/TaskHome'
import commentAdd from './modules/task/commentAdd'
import GetPost from './modules/task/GetPost'

//物业管理
import TaskProcessHome from './modules/taskProcess/TaskProcessHome'
import commentAddProcess from './modules/taskProcess/commentAddProcess'
import ProcessDetail from './modules/taskProcess/ProcessDetail'

//物业缴费
import PayHome from './modules/payment/PayHome'
import Payment from './modules/payment/Payment'
import PayDetail from './modules/payment/PayDetail'


//headerRight: (<TouchableOpacity onPress={() => navigation.navigate('PayDetail')}><Image source={require('./assets/imgs/File.png')} style={{width:25,height:27,marginRight:12}} /></TouchableOpacity>),
export const AppNavigator = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
           header:null
       }
   },
  Main: { screen: MainScreen,
   navigationOptions:{
          header:null
      }
   },
  EntList: {
      screen: EntList,
      navigationOptions:{
            title:'在园企业',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
    },
  EntDetail: {
    screen: EntDetail,
    navigationOptions:{
          title:'在园企业详细',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
  },
  //园区新闻
  NewsList: {
    screen: NewsList,
    navigationOptions:{
          title:'园区新闻',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
  },
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions:{
        title:'园区新闻详细',
        headerStyle : {backgroundColor:'#347aea'},
        headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
        style:{backgroundColor : 'white'},
    }
  },
  //园区公告新闻
    NoticeList: {
        screen: NoticeList,
        navigationOptions:{
            title:'园区公告',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
    },
    NoticeDetail: {
        screen: NoticeDetail,
        navigationOptions:{
              title:'园区公告详细',
              headerStyle : {backgroundColor:'#347aea'},
              headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
              style:{backgroundColor : 'white'},
          }
    },

  PropertyManage: {
    screen: PropertyManage,
    navigationOptions:{
          title:'物业管理',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
  },
  //物业公告
  PropertyHome: {
  screen: PropertyHome,
  navigationOptions:{
      title:'物业公告',
      headerStyle : {backgroundColor:'#347aea'},
      headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
      style:{backgroundColor : 'white'},
  },
  },
  PropertyDetail: {
      screen: PropertyDetail,
      navigationOptions:{
            title:'物业公告',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
    },
    //发布任务
    PublishHome: {
    screen: PublishHome,
    navigationOptions:{
        title:'发布公告',
        headerStyle : {backgroundColor:'#347aea'},
        headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
        style:{backgroundColor : 'white'},
    }
    },
    Complain: {
      screen: Complain,
      navigationOptions:{
          title:'投诉建议',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
    },
    Help: {
      screen: Help,
      navigationOptions:{
           title:'咨询求助',
           headerStyle : {backgroundColor:'#347aea'},
           headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
           style:{backgroundColor : 'white'},
      }
    },
    Repair: {
          screen: Repair,
          navigationOptions:{
              title:'报修',
              headerStyle : {backgroundColor:'#347aea'},
              headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
              style:{backgroundColor : 'white'},
          }
      },
    Patrol: {
        screen: Patrol,
        navigationOptions:{
            title:'巡逻任务',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
    },
  //个人中心
  UserHome: {
    screen: UserHome,
        navigationOptions:{
            title:'个人中心',
            headerStyle : {backgroundColor:'#88919f',height:40},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
  },
  RtPwd: {
      screen: RtPwd,
          navigationOptions:{
              title:'修改密码',
              headerStyle : {backgroundColor:'#347aea'},
              headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
              style:{backgroundColor : 'white'},
          }
    },
  Enterprise: {
    screen: Enterprise,
        navigationOptions:{
            title:'企业信息',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
  },
  Introduction: {
      screen: Introduction,
          navigationOptions:{
              title:'功能介绍',
              headerStyle : {backgroundColor:'#347aea'},
              headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
              style:{backgroundColor : 'white'},
          }
   },
  //我的任务
  TaskHome: {
    screen: TaskHome,
        navigationOptions:{
            title:'任务管理',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
  },
  commentAdd: {
    screen: commentAdd,
    navigationOptions:{
        title:'添加评论',
        headerStyle : {backgroundColor:'#347aea'},
        headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
        style:{backgroundColor : 'white'},
    }
  },
  GetPost: {
      screen: GetPost,
      navigationOptions:{
          title:'查看详情',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
    },
  //物业人员处理列表
    TaskProcessHome: {
      screen: TaskProcessHome,
      navigationOptions:{
          title:'任务管理',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
    },
    commentAddProcess: {
      screen: commentAddProcess,
      navigationOptions:{
          title:'处理评论',
          headerStyle : {backgroundColor:'#347aea'},
          headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
          style:{backgroundColor : 'white'},
      }
    },
    ProcessDetail: {
       screen: ProcessDetail,
       navigationOptions:{
           title:'详细信息',
           headerStyle : {backgroundColor:'#347aea'},
           headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
           style:{backgroundColor : 'white'},
       }
     },
  //缴费列表
  PayHome: {
      screen: PayHome,
          navigationOptions:{
              title:'物业缴费',
              headerStyle : {backgroundColor:'#347aea'},
              headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
              style:{backgroundColor : 'white'},
          }
  },
  Payment: {
    screen: Payment,
    navigationOptions: ({navigation}) => ({
                headerTitle: '物业缴费',
                headerStyle: {backgroundColor: '#347aea'},  //导航栏的样式
                headerTitleStyle: {color:'white',fontWeight:'500',alignSelf:'center'},
            })

    },
  PayDetail: {
    screen: PayDetail,
        navigationOptions:{
            title:'物业详情',
            headerStyle : {backgroundColor:'#347aea'},
            headerTitleStyle : {color:'white',fontWeight:'500',alignSelf:'center'},
            style:{backgroundColor : 'white'},
        }
  },

});

class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <AppNavigator ref={nav => { this.navigator = nav; }}
            />
        );
    }
}
module.exports = MainApp
