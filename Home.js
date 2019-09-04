import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  ScrollView,
  ImageBackground,  
  Animated,
  ActivityIndicator 
} from 'react-native';
import DrawerBtn from './component/DrawerBtn/DrawerBtn.js';
import PlacesList from './component/PlacesList/PlacesList.js'; 
import Image from './assets/backgroundImageApp.jpg';
import HeaderMainPage from './component/HeaderMainPage/HeaderMainPage.js';
import Hr from './UI/Hr/Hr.js';

class Home extends Component{
  constructor(props){
    super(props);     
    this.state={
        open:this.props.navigation.openDrawer,                
        SelectedPlace:[],
        inFindPlace:false,        
        popInAnim: new Animated.Value(0),
        loading:false,                 
    };       
  } 
    
    openCloseDrawer = () => {
        this.props.navigation.openDrawer();        
    }

    onItemSelected=(id)=>{
      this.setState({SelectedPlace:[]})
        this.props.screenProps.places.find(place=>{
          if(place.m_place_id===id){                 
            return this.state.SelectedPlace.push(place)
          }                    
        })
        this.onRoutePlaceD()                     
    }

    onRoutePlaceD=()=>{
      this.props.navigation.navigate('PlaceDetail', { SelectedPlace:this.state.SelectedPlace })
    }
    
    componentDidMount() {      
      this.props.navigation.setParams({ handleDrawer: this.openCloseDrawer}); 
      Animated.timing(this.state.popInAnim,
      {toValue: 1,duration: 4000,useNativeDriver: true,delay:3500}
      ).start();      
    }

    //passing param to <DrawerBtn/>
    static navigationOptions = ({ navigation }) => {
          const { params = {} } = navigation.state;
          return {
              headerTitle: <DrawerBtn  open={params.handleDrawer} />,            
              headerStyle:{
                backgroundColor:'#EE703A'
                },            
              headerTransparent: false    
          };
      };   

  render(){
  const {viewMode}=this.props.screenProps;    
    return (                  
        <View style={styles.container}>
          <View style={viewMode==="portrait"?styles.headerContainer:styles.headerContainerLand}>        
            <HeaderMainPage/>                                  
          </View>
          <Animated.View style={{
            opacity:this.state.popInAnim,
           }}>                   
          <Hr/>
            </Animated.View>
            {this.props.screenProps.places.length===0 
              ?<ActivityIndicator size="large" color="white" />
              :<PlacesList places={this.props.screenProps.places} 
                inFindPlace={this.state.inFindPlace} 
                onItemSelected={this.onItemSelected}                                               
                />                   
            }
          </View>
        )
     }    
  }

  
const styles = StyleSheet.create({
  headerContainer:{
    height:245,    
  },
  container: {
    flex: 1,    
    backgroundColor:"#EE703A",
    padding:20        
  },
  headerContainerLand:{
    height:150,    
  } 
});

export default Home;