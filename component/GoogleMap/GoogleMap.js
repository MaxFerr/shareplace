import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput,
  Dimensions  
} from 'react-native';
import MapView from 'react-native-maps';

class GoogleMap extends Component{
  constructor(props){
    super(props);
    this.state={
    focusedLocation: {
      latitude: Number(this.props.latitude),
      longitude: Number(this.props.longitude),
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false
    }
  }

  getCurrentLocation=()=>{    
    navigator.geolocation.getCurrentPosition(
        (position) => {
        this.map.animateToRegion({
       ...this.state.focusedLocation,
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
       });          
        this.setState(prevState=>{
          return {
            focusedLocation:{
              ...prevState.focusedLocation,
              latitude:position.coords.latitude,
              longitude:position.coords.longitude
            }
          }          
        })
        },
        (error) => console.log(error),
        {enableHighAccuracy: false, timeout: 50000}
    );  
    
  }

  pickLocationHandler=(event)=>{
    const lat=event.nativeEvent.coordinate.latitude;
    const long=event.nativeEvent.coordinate.longitude;
     this.map.animateToRegion({
       ...this.state.focusedLocation,
       latitude: lat,
       longitude: long
       });
       this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: lat,
          longitude: long
        },
        locationChosen: true
      };
    });          
    this.props.pickLocation(lat,long)
  }



 render() {
 const {pickLocation,style}=this.props;
 const {focusedLocation,locationChosen}=this.state;  
    return (
      <View style={styles.container}>
      {pickLocation
        ?<MapView
          initialRegion={focusedLocation}
          style={[styles.map,style]}           
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        > 
        {locationChosen?<MapView.Marker coordinate={focusedLocation}/>:null}        
        </MapView>
        :<MapView
          initialRegion={focusedLocation}
          style={[styles.map,style]}
          ref={ref => this.map = ref}
        > 
        {locationChosen?<MapView.Marker coordinate={focusedLocation}/>:<MapView.Marker coordinate={focusedLocation}/>}        
        </MapView>
        }
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getCurrentLocation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 200
  },
  button: {
    margin: 8,
    padding:10
  }
});

export default GoogleMap;