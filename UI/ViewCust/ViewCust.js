import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button  
} from 'react-native';


const ViewCust=props=>(
        <View style={[styles.container,props.style]} {...props} >
        {props.children}
        </View>
)


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ViewCust;
