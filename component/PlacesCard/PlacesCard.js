import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,  
  TouchableOpacity,
  Image,  
  Animated,  
} from 'react-native';
import Hr from '../../UI/Hr/Hr.js';
import { ScreenOrientation } from 'expo';

class PlacesCard extends Component{
  constructor(props){
    super(props);     
    this.state={
        popInAnim: new Animated.Value(0),
        viewMode :this.onOrientation()                         
    };
    ScreenOrientation.addOrientationChangeListener(this.onOrientation)     
  }

  componentDidMount() {      
    Animated.timing(this.state.popInAnim,
      {toValue: 1,duration: 2000,useNativeDriver: true,delay:this.props.inFindPlace?500:3500}
    ).start();
  }

  onOrientation=()=>{
    ScreenOrientation.getOrientationAsync()
    .then(res=>{      
      const currentOrientation=res.orientation.split('_')[0];
      if(currentOrientation==="PORTRAIT"){
        this.setState({viewMode:"portrait"})
      }else{
        this.setState({viewMode:"landscape"})
      }      
    })
  } 

  componentWillUnmount(){
    ScreenOrientation.removeOrientationChangeListeners()
  }
  
  
  render(){    
  const {onItemPressed,inSavePlace,image,inFindPlace,name,country,description}=this.props;
  const {viewMode,popInAnim}=this.state;    
    return ( 
      <TouchableOpacity onPress={onItemPressed}>
      <Animated.View style={{
            opacity:popInAnim,
            }}>
        <View style={viewMode==="portrait"?styles.listItem:styles.listItemLand}>
          {inSavePlace
            ?<Image source={{uri:image}} style={viewMode==="portrait"?
           (inFindPlace ?styles.placeImageInFind :styles.placeImage)
           :(inFindPlace ?styles.placeImageInFindLand :styles.placeImageLand)
         } resizeMode="cover" />
            :<Image source={{uri: `data:image/jpg;base64,${image}`}} style={viewMode==="portrait"?
           (inFindPlace ?styles.placeImageInFind :styles.placeImage)
           :(inFindPlace ?styles.placeImageInFindLand :styles.placeImageLand)
         } resizeMode="cover" />
          }                
          <Text style={styles.placeText}>{name},{country} </Text>            
          <Text style={styles.placeTextItalic} >{`" ${description} "`}</Text>
        </View>        
      <Hr/>
      </Animated.View>
      </TouchableOpacity>  
        )
     }    
  }


const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,    
    flexDirection: "column",
    alignItems: "center",
  },
  listItemLand:{
    width: "100%",
    marginBottom: 5,
    padding: 10,    
    flexDirection: "row",
    alignItems: "center",    
    justifyContent: "flex-start",
  },
  placeImage: {
      marginRight: 0,
      height: 200,
      width: '100%',
      borderRadius:5
  },
  placeImageLand: {      
      height: 70,
      width: '15%',
      marginRight:15,
      marginLeft:"10%",
      borderRadius:5
  },
  placeImageInFind: {
      marginRight: 0,
      height: 140,
      width: '90%',
      borderRadius:5
  },
  placeImageInFindLand: {
     height: 70,
      width: '15%',
      marginRight:15,
      marginLeft:"10%",
      borderRadius:5
  },
  placeText:{
    color:'white',
    fontSize:20
  },
  placeTextItalic:{
    fontStyle: 'italic',
    color:'white'
  }  
});

export default PlacesCard;



