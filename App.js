import React from 'react';
import Container from './Container.js';
import {init} from './Database/Database.js';

init().then(()=>{
      console.log('init db')
    }).catch(err=>{
      console.log(err);
    });
    
export default function App() {
  
  return (    
     <Container/>    
  );
}


