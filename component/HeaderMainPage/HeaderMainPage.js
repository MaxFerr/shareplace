import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,  
  TouchableOpacity,
  Image,
  Animated  
} from 'react-native';


class HeaderMainPage extends Component{
  constructor(props){
    super(props);     
    this.state={
          popInAnim1: new Animated.Value(0),
          popInAnim2: new Animated.Value(0),
          popInAnim3: new Animated.Value(0),
          popInAnim4: new Animated.Value(0),
          popInAnim5: new Animated.Value(0)                  
    };    
  }

  

  componentDidMount() {
  const {popInAnim1,popInAnim2,popInAnim3,popInAnim4,popInAnim5}=this.state;    
    Animated.timing(popInAnim1,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:100}
    ).start();
    Animated.timing(popInAnim2,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:600}
    ).start();  
    Animated.timing(popInAnim3,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:1400}
    ).start();  
    Animated.timing(popInAnim4,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:1900}
    ).start();  
    Animated.timing(popInAnim5,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:2400}
    ).start();                          
  }

  render(){
  const {popInAnim1,popInAnim2,popInAnim3,popInAnim4,popInAnim5}=this.state;    
    return(     
      <View style={styles.container} >      
        <View style={styles.textOnImage}>                 
          <Animated.Text 
          style={{
            opacity:popInAnim1,
            color:'white', 
            fontSize:20, 
            color:'orange'}}>Find</Animated.Text>
          <Animated.Text style={{
            opacity:popInAnim2,
            color:'white', 
            fontSize:10}}>and</Animated.Text> 
          <Animated.Text 
          style={{
            opacity:popInAnim3,
            color:'white', 
            fontSize:20, 
            color:'orange'}}>Share</Animated.Text>
          <Animated.Text 
          style={{
            opacity:popInAnim4,
            color:'white', 
            fontSize:20, 
            color:'orange'}}>{`Places you <3 !`}</Animated.Text>
          <Animated.Text style={{
            opacity:popInAnim5,
            color:'white', 
            fontSize:10}}>No matter where you are !</Animated.Text> 
        </View>
      </View>
       
      )
  } 
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:300,    
  },
 imageHeader:{
  width:'100%',
  height:250,
  position:'absolute'
 },
 textOnImage:{
  position: 'absolute', 
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0, 
  justifyContent: 'center', 
  alignItems: 'center'
 } 
});

export default HeaderMainPage;