import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput  
} from 'react-native';

import PlaceListSec from '../PlaceListSec/PlaceListSec.js'; 
import Image from '../../assets/backgroundImageApp.jpg';
import Hr from '../../UI/Hr/Hr.js';

class FindAPlace extends Component{
  constructor(props){
    super(props);
    this.state={      
        searchInput:'',
        inFindPlace:true,
        SelectedPlace:[]        
    }    
  }

  onItemSelected=(id)=>{
      this.setState({SelectedPlace:[]})
        this.props.screenProps.places.find(place=>{
          if(place.m_place_id===id){                 
            return this.state.SelectedPlace.push(place)
          }                    
        })
        this.onRoutePlaceD()                     
    };

    onRoutePlaceD=()=>{
      this.props.navigation.navigate('PlaceDetail', { SelectedPlace:this.state.SelectedPlace })
    };
    

  onSearch=(value)=>{
    this.setState({searchInput:value})         
  };
  

  render(){
  const {searchInput,inFindPlace}=this.state;
  const {viewMode}=this.props.screenProps;    
  const filteredPlaces=this.props.screenProps.places.filter(place=>{
    let city=place.placename.toLowerCase().includes(searchInput.toLowerCase());
    let country=place.country.toLowerCase().includes(searchInput.toLowerCase());
    if(city){
      return city
    } else{
      return country
    }
    
  })  
    return (
      <View style={styles.container} >
      <View>          
          <TextInput 
          placeholder="Find a place!" 
          style={styles.input}         
          placeholderTextColor='rgba(225,225,225,0.7)'
          onChangeText={this.onSearch}
          value={searchInput}
          />
          <Hr/>
        </View>
         <PlaceListSec 
         places={filteredPlaces} 
         inFindPlace={inFindPlace} 
         onItemSelected={this.onItemSelected}
         viewMode={viewMode}                         
         />           
      </View>
      )
  }

}

const styles = StyleSheet.create({
  input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
        width:'80%',
        marginTop:70,
        marginLeft:'10%',
        marginRight:'10%',
        borderRadius:10        
    },
    container:{ 
      flex:1,
      backgroundColor: '#EE703A',
      padding:20      
    }  
});

export default FindAPlace;