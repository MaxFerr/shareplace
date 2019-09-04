import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  AsyncStorage,
  ActivityIndicator  
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class LoadingScreen extends Component{
  constructor(props){
    super(props);     
    this.state={
        
    };
    
  } 
  componentDidMount(){
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      if(state.isConnected){
        const tryLogin=async()=>{
          const userData=await AsyncStorage.getItem('userData');
          if(!userData){
            this.props.navigation.navigate('Login');
            return;
            }
            const transformedData=JSON.parse(userData);
            const {token,userId,email}=transformedData;
            fetch('https://shareplacesapi.herokuapp.com/autoLogin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:userId,
              token:token,
              email:email     
            })
          })
          .then(response=>{          
            return response.json()
          })
          .then(user=>{
            if(user.m_user_id){
              this.props.screenProps.userData(user.m_user_id,user.username,user.email,user.joined)
              this.props.screenProps.checkIfLoggedIn(user)
              this.props.navigation.navigate('Home')
            }else{
              this.props.navigation.navigate('Login')
            }
          })
        }
        tryLogin() 
      }else{
        this.props.navigation.navigate('Home')
      }
    }); 
  }
  
 
  render(){    
    return ( 
      <View style={styles.screen} >
        <ActivityIndicator size='large' color='blue' />
      </View>
        )
     }    
  }

  
const styles = StyleSheet.create({
 screen:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 }
});

export default LoadingScreen;