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
  ScrollView  
} from 'react-native';
import BackgroundImage from '../../assets/backgroundImageApp.jpg'; 


class ForgotPassword extends Component{
  constructor(){
    super();
    this.state={
       email:'',
       code:'',
       password:'',
       confirmPassword:'',      
       wrongCred:false,
       loadingEmail:false,
       loading:false,
       correctEmail:false,
       wrongEmail:false,
       errorEmail:false,       
       equalPass:true,
       correctPassLength:true,
       wrongCode:false       
    }    
  }

  onEmailChange=(value)=>{
    this.setState({email:value})         
  };

  onCodeChange=(value)=>{
    this.setState({code:value})
  };

  onPasswordChange=(value)=>{
    this.setState({password:value})
    if(value.length>=5){      
      this.setState({correctPassLength:true}) 
    }else{
      this.setState({correctPassLength:false})
    }
    this.checkeEqualPass(this.state.confirmPassword,value)        
  };

  onConfirmPasswordChange=(value)=>{
    this.setState({confirmPassword:value})
    this.setState({touched:true})
    this.checkeEqualPass(value,this.state.password)    
  };

  checkeEqualPass=(password,confirmPassword)=>{    
      if(password===confirmPassword){
        this.setState({equalPass:true})
      }else{
        this.setState({equalPass:false})
      }
    }

  onSendingEmail=()=>{
    this.setState({loadingEmail:true})
    this.setState({wrongEmail:false})
    fetch('https://shareplacesapi.herokuapp.com/forgot',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:this.state.email,
        })
      })
      .then(response=>{
        return response.json()
      })
      .then(user=>{
        this.setState({loadingEmail:false})
        if(user.id){
          this.setState({correctEmail:true})          
        }else{
          this.setState({wrongEmail:true}) 
        }      
      })
  };

   
   onChangingPassword=()=>{
    this.setState({wrongCode:false})
    this.setState({loading:true})
    if(this.state.equalPass && this.state.correctEmail){
      this.setState({loading:true})      
      fetch('https://shareplacesapi.herokuapp.com/resetPass',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            password:this.state.confirmPassword,
            token:this.state.code,
            email:this.state.email
          })
        })
        .then(response=>{          
          return response.json()

        })
        .then(user=>{
          this.setState({loading:false})          
          if(user.email){
            this.props.navigation.navigate('Login')
          }else{
            this.setState({wrongCode:true})
          }      
        })
      }else{
        this.setState({wrongCode:true})        
      }    
    };
 
  render(){
    const {loadingEmail,loading,correctPassLength,wrongCode,equalPass,email,code,password,confirmPassword,correctEmail,wrongEmail}=this.state;
    const {viewMode}=this.props.screenProps;
    return (        
    <ImageBackground source={BackgroundImage} resizeMode="cover" style={{width: '100%', height: '100%'}}>     
      <KeyboardAvoidingView style={styles.forgetPass} behavior="padding" enabled>
        <View>
        <ScrollView style={styles.scrollViewCont} >
          <View style={viewMode==='portrait'?null:styles.landConf} >
            <View style={viewMode==='portrait'?null:styles.emailLandCont}>
              <Text style={styles.forgetText} >Enter your email address and you will receive shortly an email :</Text>          
              <TextInput 
              placeholder="Email" 
              style={styles.input}         
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={this.onEmailChange}
              value={email}
              keyboardType="email-address"
              />
            </View>
            <View style={viewMode==='portrait'?styles.btn:styles.btnLand}>
            {correctEmail
                ?<Text style={styles.correctEmailMsg} >Email sent !</Text>
                :null
              }
              {wrongEmail
                ?<Text style={styles.errorEmailMsg} >Wrong email !</Text>
                :null
              }
              {loadingEmail
              ?<ActivityIndicator size="small" color="white" />
              :<View>            
              <Button title="Send" onPress={() => this.onSendingEmail()}/>
              </View>
              }              
            </View>
            </View>
            {correctEmail
              ?<View>
              <View style={viewMode==='portrait'?null:styles.landConf} >
              <View style={viewMode==='portrait'?null:styles.emailLandCont2}>
                <Text style={styles.forgetText} >Enter the code you received here :</Text>
                <TextInput 
                placeholder="Code" 
                style={styles.input}          
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText={this.onCodeChange}
                value={code}          
                />
              </View>              
            </View>
            <View style={viewMode==='portrait'?null:styles.landConf} >   
              <TextInput 
              placeholder="Password" 
              style={viewMode==='portrait'?styles.input:styles.inputLand}        
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={this.onPasswordChange}
              value={password}
              secureTextEntry          
              />
              <TextInput 
              placeholder="Confirm password" 
              style={viewMode==='portrait'?styles.input:styles.inputLand}          
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={this.onConfirmPasswordChange}
              value={confirmPassword}
              secureTextEntry          
              />              
            </View>
            {correctPassLength
              ?null
              :<Text style={styles.samePassText} >Password too short.(5 char min)</Text>
            }
            {equalPass
              ?null
              :<Text style={styles.samePassText} >Passwords do not match !</Text>
            }
            {wrongCode
              ?<Text style={styles.samePassText} >Invalid code or password</Text>
              :null
            }
            {loading
              ?<ActivityIndicator size="small" color="white" />
              :<View>
              <Button title="Change your password !" onPress={() => this.onChangingPassword()} />
              </View>
            }            
            </View>
              :null
            }            
             </ScrollView>           
          </View>         
        </KeyboardAvoidingView>           
      </ImageBackground>
      )
  }

}

const styles = StyleSheet.create({
  forgetPass:{ 
    flex:1,        
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom:10      
  },
  scrollViewCont:{
    marginTop:'17%'
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  btn:{    
    marginBottom:25,
    width:"100%",
    alignSelf: 'center',       
  },
  forgetText:{
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10
  },
  landConf:{
    flexDirection:'row'
  },
  inputLand:{
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
    width:'50%'
  },
  emailLandCont:{    
    width:'70%',
    marginRight:'1%'
  },
  emailLandCont2:{    
    width:'100%',    
  },
  btnLand:{
    width:'29%',
    alignSelf: 'center',
    marginTop:-10    
  },
  errorEmailMsg:{
    color:'red',
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10
  },
  correctEmailMsg:{
    color:'green',
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10,
    marginBottom:10
  },
  correctCodelMsg:{
    color:'green',
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10
  },
  errorCodeMsg:{
    color:'red',
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10
  },
  samePassText:{
    color:'red',
    fontSize:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:2,
    padding:10,
    marginBottom:10
  }
});


export default ForgotPassword;