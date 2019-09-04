import React, { Component } from "react";
import {  
  StyleSheet, 
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,  
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import ViewCust from '../../UI/ViewCust/ViewCust.js';
import BackgroundImage from '../../assets/backgroundImageApp.jpg'; 
import Images from '../../assets/backgroundImageApp.jpg';
import GoogleMap from '../GoogleMap/GoogleMap.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {insertPlace} from '../../Database/Database.js';
import * as FileSystem from 'expo-file-system';

class ShareAPlace extends Component{
  constructor(props){
    super(props);
    this.state={
      placeName:'',
      country:'',
      position:{
              latitude:null,
              longitude:null
            },
      image:null,
      imagebase64:null,
      description:'',      
      emptyField:false,
      loading:false,
      placeShared:true,      
    }   
  }

  
  onPlaceName=(value)=>{
    this.setState({placeName:value})         
  };

  onCountry=(value)=>{
    this.setState({country:value})         
  };

  onImage=(value)=>{
    this.setState({image:value})         
  };

  onDescription=(value)=>{
    this.setState({description:value})         
  };

  onSharePlace=()=>{
  const {placeName,country,image,imagebase64,description}=this.state;
  const {latitude,longitude}=this.state.position;  
  const {onAddAPlace,isLoggedIn}=this.props.screenProps;
  this.setState({placeShared:true})
    if(placeName===''||country===''||latitude===null||
      longitude===null||image===null||imagebase64===null
      ||description===''){
        this.setState({emptyField:true})
      }else if(isLoggedIn) {
          this.setState({loading:true});
          //need to change the math.random
          onAddAPlace({
              m_place_id:Math.random(),      
              placename:placeName,
              country:country,
              latitude:latitude,
              longitude:longitude,
              description:description,
              image:imagebase64,
            });
    fetch('https://shareplacesapi.herokuapp.com/newplace',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          image:imagebase64,    
          placename:placeName,
          country:country,
          description:description,        
          latitude:latitude,
          longitude:longitude,
          user:this.props.screenProps.user.id
        })
      })
      .then(response=>{       
        return response.json()
      })
      .then(place=>{
        this.setState({loading:false});
        if(place.m_place_id){
          this.props.navigation.navigate('Home');
        }else{
          this.setState({placeShared:false})          
        }      
      })
      }else{
        return;
      }   
    };
   

  pickLocation=(lat,long)=>{     
      this.setState({position:{
        latitude:lat,
        longitude:long
      }});
    };
  

  verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  newDir= async()=>{
          try {
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory,{
            intermediates:true
          });
        } catch(err){
          throw err;
        }
     };

   saveImage= async(image)=>{
    this.newDir();
          const fileName=image.split('/').pop();
          const newPath=FileSystem.documentDirectory + fileName;          
          try {
          await FileSystem.moveAsync({
              from:image,
              to: newPath
            });
           
        } catch(err){
          throw err;
        }
        this.setState({image:newPath});
        }
        

  takeImageCamHandler = async () => {
    const hasPermission = await this.verifyPermissions();
    if (!hasPermission) {
        return;
    }
    const imageChosen = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
      base64:true
    });    
    if(!imageChosen.cancelled){
       this.saveImage(imageChosen.uri);      
      this.setState({imagebase64:imageChosen.base64});
    }    
  };

 takeImageLibHandler = async () => {
    const hasPermission = await this.verifyPermissions();
    if (!hasPermission) {
        return;
    }
    const imageChosen = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
      base64:true      
    });    
    if(!imageChosen.cancelled){
        this.saveImage(imageChosen.uri) 
      this.setState({imagebase64:imageChosen.base64});    
    }    
  };

  onSavePlace=()=>{
  const {placeName,country,image,description}=this.state;
  const {latitude,longitude}=this.state.position;   
    insertPlace(placeName,country,image, latitude,longitude,description)
    .then(place=>{     
        if(place.insertId){ 
        this.props.screenProps.onSaveAPlace({
              m_place_id:Math.random(),      
              placename:placeName,
              country:country,
              latitude:latitude,
              longitude:longitude,
              description:description,
              image:image,
            });        
          this.props.navigation.navigate('Home')
        }
      }).catch(err=>{
        if(err){
         this.setState({emptyField:true})
        }
      })   
  };

  
  render(){    
    const {placeName,country,image,emptyField,loading,description}=this.state;   
    const {viewMode}=this.props.screenProps; 
    const content=( 
    <View>   
      <View style={viewMode==="portrait"?null:styles.inputsContainerLand} >       
          <View style={viewMode==="portrait"?null:styles.inputLandContainer} >     
            <TextInput 
            placeholder="Place's name" 
            style={styles.input}          
            placeholderTextColor='rgba(225,225,225,0.7)'
            onChangeText={this.onPlaceName}
            value={placeName}
            />
          </View>
          <View style={viewMode==="portrait"?null:styles.inputLandContainer} >       
             <TextInput 
            placeholder="Description"
             style={styles.input} 
             placeholderTextColor='rgba(225,225,225,0.7)'           
             multiline = {true}
             numberOfLines = {4}
             onChangeText={this.onDescription}
             value={description}
             />
          </View>
          </View>
          <View style={viewMode==="portrait"?null:styles.inputsContainerLand} >
           <View style={viewMode==="portrait"?null:styles.inputLandContainer} >          
            <TextInput 
            placeholder="Country"
             style={styles.input} 
             placeholderTextColor='rgba(225,225,225,0.7)'
             onChangeText={this.onCountry}
             value={country}           
             />
          </View>
            <View style={viewMode==="portrait"?null:styles.inputLandContainer} >       
             <GoogleMap pickLocation={this.pickLocation} latitude={40} longitude={122} style={viewMode==="portrait"?styles.mapStyle:styles.mapStyleLand}/>
            </View> 
          </View> 
          <View style={viewMode==="portrait"?null:styles.inputLandContainerImage} >          
            {image===null
              ?<Text style={styles.test} >Select an image !</Text>
              :<Image source={{ uri:image }} resizeMode="contain" style={styles.picture} />
            }        
            <View style={styles.pictureBtnCont} >
            <View style={styles.takeAPictureBtn}>
            <Button title="Take a picture" onPress={this.takeImageCamHandler}/>
            </View>
             <View style={styles.pickImageBtn}>
            <Button title="Pick an image" onPress={this.takeImageLibHandler}/>
            </View>
            </View>
          </View>
          <View style={emptyField?styles.emptyFieldTrue:styles.emptyFieldFalse}> 
              <Text style={styles.emptyFieldMsg} >You need to fill all the fields,select an image and a location !</Text>
           </View>
           <View style={this.props.screenProps.isLoggedIn?styles.emptyFieldFalse:styles.emptyFieldTrue}> 
              <Text style={styles.emptyFieldMsg} >You need to be logged in !</Text>
           </View>
           {this.state.placeShared
            ?null
            :<Text style={styles.emptyFieldMsg} >Place could not be shared !</Text>
          }
           {loading
            ?(<View>              
                <ActivityIndicator size="small" color="white" />              
              </View>
              )
            :(<View style={styles.buttonContainer, styles.buttonText}>               
                <View style={styles.btn}>
                    <Button              
                    disabled={!this.props.screenProps.isLoggedIn} 
                    title="Share that place !" 
                    onPress={() => this.onSharePlace()}/>
                 </View>             
                  <Button              
                  title="Save place on your phone" 
                  onPress={() => this.onSavePlace()}/>              
              </View>
              )
          }        
        </View>
      )     
      return (
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.imageBgrd}>     
         <KeyboardAvoidingView style={viewMode==="portrait"?styles.registerContainer:styles.registerContainerLand}>
           <View>
             <ScrollView style={viewMode==="portrait"?null:styles.scrollViewCont}>
              {content}
             </ScrollView> 
           </View>
         </KeyboardAvoidingView>          
        </ImageBackground>
       )
    }
}
const styles = StyleSheet.create({
  registerContainer:{ 
    flex:1,        
    justifyContent: 'flex-end',
    padding: 20,
    marginTop:80        
  },  
  btn:{
    marginBottom:10
  },
  btnSize:{
    width:'48%'
  },
  imageBgrd:{
    width: '100%', 
    height: '100%'
  },
  picture:{
    width: '100%', 
    height: 100
  },  
  emptyFieldTrue:{
    display:'flex',
    marginTop:5,
    marginBottom:10
  },
  emptyFieldFalse:{
    display:'none'
  },
  emptyFieldMsg:{
    color:'red',
    backgroundColor:'rgba(255,255,255,0.5)',
    padding:5,
    borderRadius:5,
    textAlign:'center'
  },
  registerContainerLand:{ 
    flex:1,        
    justifyContent: 'flex-end',
    padding: 20,
    marginTop:20         
  },
  pictureBtnCont:{
    justifyContent: 'center',
    flexDirection:"row",
    padding:5,    
  },
  takeAPictureBtn:{
    width:"50%",
    marginRight:"2%"
  },
  pickImageBtn:{
    width:"50%"
  },    
  mapStyle:{
    height:150
  },
  mapStyleLand:{
    marginTop:60,
    height:100
  },
  inputsContainerLand:{      
    justifyContent: 'space-between',
    flexDirection:"row",
    padding:5,      
  },
  inputLandContainer:{
    width:'48%'
  }, 
   inputLandContainerImage:{
    width:'50%',
    marginTop:-160,
    marginBottom:42
  },       
  input:{
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer:{
    backgroundColor: '#2980b6',
    marginLeft:10    
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  scrollViewCont:{
    marginTop:40
  },
  test:{
    textAlign:'center',
    marginTop:35,
    marginBottom:5,
    height:70,
    color:"white"
  }    
});

export default ShareAPlace;

