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
  ActivityIndicator 
} from 'react-native';
import ViewCust from '../../UI/ViewCust/ViewCust.js';
import BackgroundImage from '../../assets/backgroundImageApp.jpg';

class Register extends Component{
  constructor(){
    super();
    this.state={
      loading:false,
      emailExist:false,            
          controls: {
            email: {
              value: "",
              valid: false,
              validationRules: {
                isEmail: true
              },
              touched: false
            },
            name: {
              value: "",
              valid: false,
              validationRules: {
                minLength: 3
              },
              touched: false
            },
            password: {
              value: "",
              valid: false,
              validationRules: {
                minLength: 6
              },
              touched: false
            },
            confirmPassword: {
              value: "",
              valid: false,
              validationRules: {
                equalTo: "password"
              },
              touched: false
            }
        }
    }       
  }

 
  validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && this.emailValidator(val);
        break;
      case "isName":
        isValid = isValid && this.minLengthNameValidator(val, rules[rule]);
        break;
      case "minLength":
        isValid = isValid && this.minLengthValidator(val, rules[rule]);
        break;
      case "equalTo":
        isValid = isValid && this.equalToValidator(val, connectedValue[rule]);
        break;
      case "notEmpty":
        isValid = isValid && this.notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
};

emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

minLengthNameValidator = (val, minLength) => {
  return val.length >= minLength;
};

equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

notEmptyValidator = val => {
  return val.trim() !== "";
};

 updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? this.validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: this.validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

onRegister=()=>{
  this.setState({loading:true})
  this.setState({emailExist:false})
  fetch('https://shareplacesapi.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.controls.email.value,    
        name:this.state.controls.name.value,
        password:this.state.controls.password.value        
      })
    })
    .then(response=>{       
      return response.json()
    })
    .then(user=>{
      this.setState({loading:false})
      if(user.m_user_id){
        this.props.navigation.navigate('Login')
      }else{
        this.setState({emailExist:true})        
      }      
    })
  }

  
  render(){ 
    const {loading}=this.state;
    const {viewMode}=this.props.screenProps;    
    return (
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={{width: '100%', height: '100%'}}>     
      <KeyboardAvoidingView style={styles.registerContainer} behavior="padding" enabled>
      <View style={viewMode==="portrait"?null:styles.inputsContainerLand} >       
        <View style={viewMode==="portrait"?null:styles.inputLandContainer} >           
          <TextInput 
          placeholder="Email" 
          style={styles.input}          
          placeholderTextColor='rgba(225,225,225,0.7)'
          onChangeText={val => this.updateInputState("email", val)}
          value={this.state.controls.email.value}
          valid={this.state.controls.email.valid}
          touched={this.state.controls.email.touched}
          keyboardType="email-address"
          />
        </View>
        {this.state.controls.email.touched
          ?this.state.controls.email.valid
            ?null
            :<View style={styles.errorMessagesContainer}><Text style={styles.errorMessages}>Invalid Email !</Text></View>
          :null}
          {this.state.emailExist
            ?<View style={styles.errorMessagesContainer}><Text style={styles.errorMessages}>Email already exist !</Text></View>
            :null
          }        
        <View style={viewMode==="portrait"?null:styles.inputLandContainer}>          
          <TextInput 
          placeholder="Name" 
          style={styles.input}          
          placeholderTextColor='rgba(225,225,225,0.7)'
          onChangeText={val => this.updateInputState("name", val)}
          value={this.state.controls.name.value}
          valid={this.state.controls.name.valid}
          touched={this.state.controls.name.touched}
          />
        </View>
        {this.state.controls.name.touched
          ?this.state.controls.name.valid
            ?null
            :<View style={styles.errorMessagesContainer}><Text style={styles.errorMessages}>Min 3 characters !</Text></View>
          :null}        
       </View>
       <View style={viewMode==="portrait"?null:styles.inputsContainerLand}>         
        <View style={viewMode==="portrait"?null:styles.inputLandContainer}>          
          <TextInput 
          placeholder="Password"
           style={styles.input}
           placeholderTextColor='rgba(225,225,225,0.7)'
           secureTextEntry
          onChangeText={val => this.updateInputState("password", val)}
          value={this.state.controls.name.password}
          valid={this.state.controls.password.valid}
            touched={this.state.controls.password.touched}
           />
        </View>
        {this.state.controls.password.touched
          ?this.state.controls.password.valid
            ?null
            :<View style={styles.errorMessagesContainer}><Text style={styles.errorMessages}>Min 6 characters !</Text></View>
          :null}        
        <View style={viewMode==="portrait"?null:styles.inputLandContainer}>          
          <TextInput 
          placeholder="Confirm Password"
           style={styles.input}
           placeholderTextColor='rgba(225,225,225,0.7)'
           secureTextEntry
          onChangeText={val => this.updateInputState("confirmPassword", val)}
          value={this.state.controls.confirmPassword.value}
          valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
           />
        </View>
        {this.state.controls.confirmPassword.touched
          ?this.state.controls.confirmPassword.valid
            ?null
            :<View style={styles.errorMessagesContainer}><Text style={styles.errorMessages}>Passwords do not match !</Text></View>
          :null}    
        </View>
        {loading
          ?(<View>              
              <ActivityIndicator size="small" color="white" />              
            </View>
            )
          :(<View style={styles.buttonContainer, styles.buttonText}> 
              <Button 
              title="Register"
              disabled={
                !this.state.controls.confirmPassword.valid||
                !this.state.controls.name.valid||
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid
              } 
              onPress={() => this.onRegister()}/> 
            </View>
            )
        } 
        </KeyboardAvoidingView>           
      </ImageBackground>
      )
  }

}

const styles = StyleSheet.create({
  registerContainer:{ 
        flex:1,        
        justifyContent: 'flex-end',
        padding: 20,
        marginBottom:10        
    },
    inputsContainerLand:{      
      justifyContent: 'space-between',
      flexDirection:"row",
      padding:5,      
    },
    inputLandContainer:{
      width:'48%'
    },
    errorMessagesContainer:{      
      alignItems:'center',
      marginTop:-10      
    },    
    errorMessages:{
      color:'red',
      backgroundColor:'rgba(255,255,255,0.5)',
      padding:5,
      borderRadius:5
    },    
    input:{
            height: 40,
            backgroundColor: 'rgba(0,0,0,0.5)',
            marginBottom: 10,
            padding: 10,
            color: '#fff',        
        },
    buttonContainer:{
            backgroundColor: '#2980b6',
            marginLeft:10            
        },
    buttonText:{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '700'
        }
  
});

export default Register;
