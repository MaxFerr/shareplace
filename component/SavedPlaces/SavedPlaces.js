import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput  
} from 'react-native';

import PlacesList from '../PlacesList/PlacesList.js'; 
import Image from '../../assets/backgroundImageApp.jpg';
import Hr from '../../UI/Hr/Hr.js';

class SavedPlaces extends Component{
  constructor(props){
    super(props);
    this.state={      
        searchInput:'',
        inFindPlace:true,
        SelectedPlace:[],
        inSavePlace:true
    }
  }

  onItemSelected=(id)=>{
      this.setState({SelectedPlace:[]})
        this.props.screenProps.savedPlaces.find(place=>{
          if(place.m_place_id===id){                 
            return this.state.SelectedPlace.push(place)
          }                    
        })
        this.onRoutePlaceD()                     
    }

    onRoutePlaceD=()=>{
      this.props.navigation.navigate('PlaceDetail', { SelectedPlace:this.state.SelectedPlace })
    }
    

  onSearch=(value)=>{
    this.setState({searchInput:value})         
  }

  render(){
  const {searchInput,inSavePlace,inFindPlace}=this.state;
  const filteredPlaces=this.props.screenProps.savedPlaces.filter(place=>{
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
         <PlacesList places={filteredPlaces} inSavePlace={inSavePlace} inFindPlace={inFindPlace} onItemSelected={this.onItemSelected} />           
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
      padding: 20,            
    }  
});

export default SavedPlaces;