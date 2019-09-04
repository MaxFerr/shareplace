import React from "react";
import {  
  StyleSheet, 
  View,
  Text,  
  TouchableOpacity,
  FlatList
} from 'react-native';
import PlaceCardSec from '../PlaceCardSec/PlaceCardSec.js';

const PlaceListSec=({places,onItemSelected,inFindPlace,inSavePlace,viewMode})=>{ 
return (
    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={(info) => (
        <PlaceCardSec
          name={info.item.placename}
          image={info.item.image}
          country={info.item.country}
          description={info.item.description}
          onItemPressed={() => onItemSelected(info.item.m_place_id)}
          inFindPlace={inFindPlace}
          inSavePlace={inSavePlace}
          viewMode={viewMode}          
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%" 
  }
});


export default PlaceListSec;