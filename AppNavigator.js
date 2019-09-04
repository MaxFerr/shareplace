import { createDrawerNavigator, 
		createBottomTabNavigator, 
		createStackNavigator, 
		createAppContainer,
    createSwitchNavigator            
     } from "react-navigation";
import React, { Component } from "react";
import Home from './Home.js';
import Register from './component/Register/Register.js';
import Login from './component/Login/Login.js';
import ShareAPlace from './component/ShareAPlace/ShareAPlace.js';
import FindAPlace from './component/FindAPlace/FindAPlace.js';
import PlaceDetail from './component/PlaceDetail/PlaceDetail.js'; 
import LoadingScreen from './component/LoadingScreen/LoadingScreen.js';
import CustomDrawerItems from './component/CustomDrawerItems/CustomDrawerItems.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import SavedPlaces from './component/SavedPlaces/SavedPlaces.js';
import ForgotPassword from './component/ForgotPassword/ForgotPassword.js';




const TabNavigator = createBottomTabNavigator(
{   
  "Find a place": FindAPlace,
  "Share a place": ShareAPlace   
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === "Find a place") {
          iconName = `search`;
        } else if (routeName === "Share a place") {
          iconName = `plus`;
        }
        return (
            <IconComponent name={iconName} size={25} color={tintColor} />
          );
      },
    }),    
  tabBarOptions: {      
      activeTintColor: '#6B4E90',
      inactiveTintColor: 'gray',
      tabStyle:{
        backgroundColor:'#EE703A'        
      },      
      labelStyle: {
        fontSize: 12
      }
    },   
  },
);

const AppNavigator = createStackNavigator(
{
  Home:{
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title:"Home"        
    }),
  },
  Login:{
    screen: Login,
    navigationOptions: () => ({      
      headerTitle:"Login",
      headerStyle:{
        backgroundColor:'rgba(255,103,0,0.3)'
      },
      headerTransparent: true,
      headerTintColor:"white"      
    }),
  },
  Register:{
    screen: Register,
    navigationOptions: () => ({
      headerTitle: `Register`,
      headerStyle:{
        backgroundColor:'rgba(255,103,0,0.3)'
      },
      headerTransparent: true,
      headerTintColor:"white"              
    }),
  },    
 "Find/share a place":{
    screen: TabNavigator,
    navigationOptions: () => ({
      headerTitle: `Find/share a place`,
      headerStyle:{
        backgroundColor:'rgba(255,103,0,0.3)'        
      },      
      headerTransparent: true,
      headerTintColor:"white"             
    }),
  },
  PlaceDetail:{
    screen: PlaceDetail,
    navigationOptions: () => ({
      title: `Place detail`,
      headerStyle:{
        backgroundColor:'#EE703A'
      },      
      headerTransparent: false,
      headerTintColor:"white"              
    }),
  },
   SavedPlaces:{
    screen: SavedPlaces,
    navigationOptions: () => ({
      title: `Saved Places`,
      headerStyle:{
        backgroundColor:'rgba(255,103,0,0.3)'        
      },            
      headerTransparent: true,
      headerTintColor:"white"              
    }),
  },
   ForgotPassword:{
    screen: ForgotPassword,
    navigationOptions: () => ({
      title: `Forgot your password ?`,
      headerStyle:{
        backgroundColor:'rgba(255,103,0,0.3)'        
      },            
      headerTransparent: true,
      headerTintColor:"white"              
    }),
  },      
},
  {
    initialRouteName: "Home",    
  },
);


const DrawerNavigator = createDrawerNavigator(
 {
    Home:AppNavigator,
    Login:Login,
    Register:Register,
    "Find/share a place" : TabNavigator,
    SavedPlaces:SavedPlaces   
  }, 
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    contentComponent: CustomDrawerItems
  },  
);

const MainNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,  
  DrawerNavigator: DrawerNavigator  
});


export default createAppContainer(MainNavigator);