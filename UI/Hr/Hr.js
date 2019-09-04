import React from "react";
import {  
  StyleSheet, 
  View  
} from 'react-native';


const Hr=props=>(
        <View style={[styles.hr,props.style]} {...props} />  
)

const styles = StyleSheet.create({
  hr:{    
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    width:'80%' ,
    marginLeft:'10%',
    marginRight:'10%',
    marginBottom:5
  }
});

export default Hr;



