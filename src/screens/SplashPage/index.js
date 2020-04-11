import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {CommonActions} from '@react-navigation/native';

export default function SplashPage({navigation}) {
  React.useEffect(() => {
  console.log("Splash Effect");
  //firebase.auth().signOut();
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name:'MainNavigator'}],
            }),
          );
        } else {
          navigation.navigate('Login');
        }
      });
      
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>SPLASH PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
