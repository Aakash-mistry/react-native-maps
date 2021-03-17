import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;
const {height, width} = Dimensions.get('window');

const App: React.FC = () => {
  const [location, setLocation] = React.useState({
    latitude: 23.085056,
    longitude: 72.5516288,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  if (PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
    GeoLocation.getCurrentPosition(
      (res) => {
        const ASPACT_RATIO = width / height;
        const location = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: LONGITUDE_DELTA * ASPACT_RATIO,
        };
        setLocation(location);
      },
      (err) => {
        Alert.alert(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  }
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 25, padding: 10}}>
        Hello this is the map from google
      </Text>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          followsUserLocation={true}
          showsUserLocation={true}
          style={styles.mapStyle}
          loadingIndicatorColor="red"
          showsTraffic={true}
          zoomEnabled={true}
          mapType="satellite"
          zoomControlEnabled={true}
          initialRegion={location}>
          <Marker
            draggable={true}
            coordinate={location}
            tracksViewChanges={true}
            title="Your location"
            description={`Hey your current Latitide is ${location.latitude} & Longtitude is ${location.longitude}!`}>
            <Image
              source={{
                uri:
                  'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Ball-Azure-icon.png',
              }}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </Marker>
        </MapView>
        <Text style={{marginTop: 25}}>
          Current latitide : {location.latitude}
        </Text>
        <Text>Current longitude : {location.longitude}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
  },
  mapStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
