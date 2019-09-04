import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  AsyncStorage 
} from 'react-native';
import ViewCust from '../../UI/ViewCust/ViewCust.js'; 
import BackgroundImage from '../../assets/backgroundImageApp.jpg'; 


class Login extends Component{
  constructor(){
    super();
    this.state={
       email:'',
       password:'',
       wrongCred:false,
       loading:false
    }
  }

  onEmailChange=(value)=>{
    this.setState({email:value})         
  }

  onPassChange=(value)=>{
    this.setState({password:value})         
  }
  saveData=async(token,userId,email)=>{
    try{
      await AsyncStorage.setItem('userData',JSON.stringify({
      token:token,
      userId:userId,
      email:email
      }))
    } catch(error){
      return error;
    }    
  }

  onLogin=()=>{
  this.setState({loading:true})   
    fetch('https://shareplacesapi.herokuapp.com/login',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.password        
      })
    })
    .then(response=>{       
      return response.json()
    })
    .then(user=>{
    this.setState({loading:false})      
      if(user.id){
        this.props.screenProps.userData(user.id,user.username,user.email,user.joined)
        this.saveData(user.token,user.id,user.email)
        this.props.screenProps.checkIfLoggedIn(user)
        this.props.navigation.navigate('Home')
      }else{
        this.setState({wrongCred:true})        
      }      
    })
  }


  render(){
    const {email,password,loading,wrongCred}=this.state;
    return (        
    <ImageBackground source={BackgroundImage} resizeMode="cover" style={{width: '100%', height: '100%'}}>     
      <KeyboardAvoidingView style={styles.loginContainer} behavior="padding" enabled>         
        <View>          
          <TextInput 
          placeholder="Email" 
          style={styles.input}          
          placeholderTextColor='rgba(225,225,225,0.7)'
          onChangeText={this.onEmailChange}
          value={email}
          keyboardType="email-address"
          />
        </View>        
        <View>          
          <TextInput 
          placeholder="Password"
           style={styles.input} 
           placeholderTextColor='rgba(225,225,225,0.7)'
           secureTextEntry
           onChangeText={this.onPassChange}
           value={password}
           />
        </View>
        <TouchableOpacity style={styles.touchableContainer} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.textStyle}>Register</Text>        
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableContainer} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={styles.textStyle}>Forgot your password ?</Text>        
        </TouchableOpacity>
          <View style={wrongCred?styles.wrongCredTrue:styles.wrongCredFalse}> 
            <Text style={styles.wrongCredMsg} >Password or email are incorrect !</Text>
         </View>
         {loading
          ?(<View>              
              <ActivityIndicator size="small" color="white" />              
            </View>
            )
          :(<View style={styles.buttonContainer, styles.buttonText}> 
              <Button title="Login" onPress={() => this.onLogin()}/> 
            </View>
            )
        }          
        </KeyboardAvoidingView>           
      </ImageBackground>
      )
  }

}

const styles = StyleSheet.create({
  loginContainer:{ 
        flex:1,        
        justifyContent: 'flex-end',
        padding: 20,
        marginBottom:10       
    },
    wrongCredTrue:{
      display:'flex',
      marginTop:5,
      marginBottom:10      
    },
    wrongCredFalse:{
      display:'none'
    },
    wrongCredMsg:{
      color:'red',
      backgroundColor:'rgba(255,255,255,0.5)',
      padding:5,
      borderRadius:5,
      textAlign:'center'
    },
input:{
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
buttonContainer:{
        backgroundColor: '#2980b6',
        marginLeft:10
    },
buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
touchableContainer:{    
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10    
},
textStyle:{
    color:"white"
}  
  
});


export default Login;
