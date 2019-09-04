import React, { Component } from "react";
import {SafeAreaView,View,Button, StyleSheet,Text,TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomDrawerItems extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  onLogout=()=>{
    this.props.screenProps.onClickLogout()
    this.props.navigation.navigate('Login')  
  }

  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction); 
    
  }



  render(){
    const { items } = this.props;
    const currentRouteName = items[0].routes[items[0].index].routeName;
   
    return ( 

      <View style={styles.container} >
        <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
          <TouchableOpacity  onPress={this.navigateToScreen('Home')} style={currentRouteName==='Home' ?styles.drawerItemsActive:styles.drawerItemsInactive}>
            <Icon name="home" size={25} color={currentRouteName==='Home' ?"white":"black" }  />           
            <Text style={currentRouteName==='Home' ?styles.drawerTextWhite:styles.drawerText} >
            Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Find/share a place')} style={currentRouteName==='Find/share a place'?styles.drawerItemsActive:styles.drawerItemsInactive}>
             <Icon name="search" size={25} color={currentRouteName==='Find/share a place' ?"white":"black" }  />  
            <Text style={currentRouteName==='Find/share a place' ?styles.drawerTextWhite:styles.drawerText}>
            Find/share a place
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('SavedPlaces')} style={currentRouteName==='SavedPlaces'?styles.drawerItemsActive:styles.drawerItemsInactive}>
             <Icon name="save" size={25} color={currentRouteName==='SavedPlaces' ?"white":"black" }  />  
            <Text style={currentRouteName==='SavedPlaces' ?styles.drawerTextWhite:styles.drawerText}>
            Saved Places
            </Text>
          </TouchableOpacity>
          {this.props.screenProps.isLoggedIn
            ?
              <TouchableOpacity style={styles.drawerItemsInactive} onPress={()=>{this.onLogout()}}>
              <Icon name="sign-out" size={25}  /> 
                <Text style={styles.drawerText}>
                Logout
                </Text>
              </TouchableOpacity>
            :
            <View >
            <TouchableOpacity onPress={this.navigateToScreen('Login')} style={currentRouteName==='Login'?styles.drawerItemsActive:styles.drawerItemsInactive}>
            <Icon name="sign-in" size={25} color={currentRouteName==='Login' ?"white":"black" }  /> 
              <Text style={currentRouteName==='Login' ?styles.drawerTextWhite:styles.drawerText} >
              Login
              </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigateToScreen('Register')} style={currentRouteName==='Register'?styles.drawerItemsActive:styles.drawerItemsInactive}>
              <Icon name="file" size={20} color={currentRouteName==='Register' ?"white":"black" } />
              <Text style={currentRouteName==='Register' ?styles.drawerTextWhite:styles.drawerText}>
              Register
              </Text>
              </TouchableOpacity>
            </View>
          }          
        </SafeAreaView>
      </View> 
      )
  }

}

const styles = StyleSheet.create({  
  drawerItemsActive:{
    flexDirection:"row",
    padding:10,    
    marginTop:5,
    marginBottom:5,
    backgroundColor:"#FF551F",    
    borderRadius:5
  },
  drawerItemsInactive:{
    flexDirection:"row",
    padding:10,
    fontSize:17,
    marginTop:5,
    marginBottom:5    
  },
  container:{
    flex:1,
    padding:20
  },
  drawerText:{
    padding:2,
    fontSize:17,
    marginLeft:2
  },
  drawerTextWhite:{
    padding:2,
    fontSize:17,
    marginLeft:2,
    color:"white"
  }
  
});


export default CustomDrawerItems;
