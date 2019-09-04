import React from "react";
import {  
  StyleSheet, 
  View,
  Text,  
  TouchableOpacity,
  FlatList
} from 'react-native';
import PlacesCard from '../PlacesCard/PlacesCard.js';

const PlacesList=({places,onItemSelected,inFindPlace,inSavePlace})=>{ 
return (
    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={(info) => (
        <PlacesCard
          name={info.item.placename}
          image={info.item.image}
          country={info.item.country}
          description={info.item.description}
          onItemPressed={() => onItemSelected(info.item.m_place_id)}
          inFindPlace={inFindPlace}
          inSavePlace={inSavePlace}                   
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


export default PlacesList;
