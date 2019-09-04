import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TouchableOpacity  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class DrawerBtn extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){    
    return (
      <View style={styles.header}>      
        <TouchableOpacity style={styles.tes} onPress={()=>{this.props.open()}} >
          <Icon name="bars" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.tess}>
          <Text style={styles.headerStyle} >Home</Text>  
        </View>      
      </View>
      )
  }

}

const styles = StyleSheet.create({
  header:{    
    flexDirection:"row",
    justifyContent: 'flex-start',    
  },
  headerStyle:{
    color:'white',
    fontSize:20     
  },
  tes:{ 
    padding:10  
  },
  tess:{    
    justifyContent: 'center',
    marginLeft:10  
  }
});

export default DrawerBtn;