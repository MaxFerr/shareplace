import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import MainNavigator from './AppNavigator.js'; 
import Image from './assets/backgroundImageApp.jpg';
import {fetchPlaces, deletePlace } from './Database/Database.js';
import { ScreenOrientation } from 'expo';

const AppContainer=createAppContainer(MainNavigator)

class Container extends Component{
  constructor(props){
    super(props);
    this.state={
    	places:[],
      savedPlaces:[],
        user:{
          id:'',
          name:'',
          email:'',
          joined:''
        },
        isLoggedIn:false,
        viewMode:this.onOrientation(),        
      }
      ScreenOrientation.addOrientationChangeListener(this.onOrientation)     
  } 

  updateState=(id)=>{    
  	this.setState(prevState=>({
  	  		places:this.state.places.filter(place=>{  	  			
			    return place.m_place_id!==id
			    })
  	  	}))
    fetch(`https://shareplacesapi.herokuapp.com/deleteplace`,{
      method:'delete',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:id              
      })
    })
    .then(response=>{       
      return response.json()
    }).then(place=>{
      if(place.m_place_id){
        return "Place deleted"
      }else{
        alert("Place could not be deleted")
      }      
    })
  }

  onDeleteSavedPlace=(id)=>{
    this.setState(prevState=>({
          savedPlaces:this.state.savedPlaces.filter(place=>{            
          return place.m_place_id!==id
          })
        }))
    deletePlace(id).then(res=>{
      if(res.rowsAffected===1){
        console.log("place deleted") 
      }            
    }).catch(err=>{
      if(err){
        alert("Place could not be deleted." )
      }
    })
  }
  onAddAPlace=(obj)=>{
  	this.state.places.push(obj)
  }

  onSaveAPlace=(obj)=>{
    this.state.savedPlaces.push(obj)
  }

  userData=(id,name,email,joined)=>{
    this.setState({
      user:{
          id:id,
          name:name,
          email:email,
          joined:joined
        }       
    })
  }

  checkIfLoggedIn=(data)=>{
    if(this.state.user.email===data.email){
      this.setState({isLoggedIn:true})
    }else{
      this.setState({isLoggedIn:false})
    }
  }

  onClickLogout=()=>{
    this.setState({isLoggedIn:false});    
    this.setState({user:{
          id:'',
          name:'',
          email:'',
          joined:''
        }});      
  }

  componentDidMount(){      
    fetch('https://shareplacesapi.herokuapp.com/')
    .then(res=>res.json())
    .then(places=>{
      this.setState({places:places})
    }); 
    fetchPlaces().then(res=>{
      this.setState({savedPlaces:res.rows._array})      
    }).catch(err=>{
      console.log(err)
    })
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
    return  <AppContainer 
    screenProps={{places: this.state.places, 
    	updateState:this.updateState, 
    	onAddAPlace:this.onAddAPlace,
      userData:this.userData,
      user:this.state.user,
      checkIfLoggedIn:this.checkIfLoggedIn,
      isLoggedIn:this.state.isLoggedIn,
      onClickLogout:this.onClickLogout,
      savedPlaces:this.state.savedPlaces,
      onSaveAPlace:this.onSaveAPlace,
      onDeleteSavedPlace:this.onDeleteSavedPlace,
      viewMode:this.state.viewMode      
    }}/> 
     }    
  }

export default Container;
