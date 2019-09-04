import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput,
  Image,  
  ScrollView  
} from 'react-native';

import GoogleMap from '../GoogleMap/GoogleMap.js';

class PlaceDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      placeInfo:this.props.navigation.getParam('SelectedPlace')[0]      
    }    
  }
  
  onPlaceDelete=()=>{
    this.props.screenProps.updateState(this.state.placeInfo.m_place_id)
    this.props.navigation.navigate('Home')  
  }

  onSPlaceDelete=()=>{
    this.props.screenProps.onDeleteSavedPlace(this.state.placeInfo.m_place_id)
    this.props.navigation.navigate('Home')  
  }

  render(){
  const fileType=this.state.placeInfo.image.search(".jpg");
  const content = (
        <View style={styles.listItem}>
          <Text style={styles.placeText}>{this.state.placeInfo.placename}, {this.state.placeInfo.country} </Text>
          {fileType!==-1
            ?<Image source={{uri: this.state.placeInfo.image}} style={styles.placeImage} resizeMode="cover" />
            :<Image source={{uri: `data:image/jpg;base64,${this.state.placeInfo.image}`}} style={styles.placeImage} resizeMode="cover" />
          }               
          <Text style={styles.placeTextItalic} >{`" ${this.state.placeInfo.description} "`}</Text>
          <GoogleMap latitude={this.state.placeInfo.latitude} longitude={this.state.placeInfo.longitude} />
          {fileType!==-1
            ?<View style={styles.btn}>
            <Button title='Delete' onPress={() => this.onSPlaceDelete()}/>
            </View>
            :this.state.placeInfo.user_id===this.props.screenProps.user.id
            ?<View style={styles.btn}>
            <Button title='Delete' onPress={() => this.onPlaceDelete()}/>
            </View>
            :null
          }           
        </View>
            )
      
        return (
          <ScrollView style={styles.container}>
            {content}
          </ScrollView>
            )
      
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor:"#EE703A",
    padding:20        
  },
  listItem: {
    width: "100%",    
    padding: 10,
    alignItems: "center",
  },
  placeImage: {
      marginRight: 0,
      height: 200,
      width: '100%'
  },
  placeText:{
    color:'black',
    fontSize:20,
    marginBottom:15
  },
  placeTextItalic:{
    fontStyle: 'italic',
    color:'black',
    marginTop:15,
    marginBottom:15
  },
  btn:{
    marginBottom:10
  }  
});

export default PlaceDetail;