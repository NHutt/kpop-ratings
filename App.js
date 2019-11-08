import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Font } from 'expo';

import ListaaKappaleet from './pages/ListaaKappaleet';
import LisaaKappale from './pages/LisaaKappale';
import NaviTab from './navigation/NaviTab';

import { MenuProvider } from 'react-native-popup-menu';


export default class App extends React.Component {
  componentDidMount() {
    
    Font.loadAsync({
      'moon-flower': require('./assets/fonts/MoonFlower.ttf'
      ),
      'moon-flower-bold': require('./assets/fonts/MoonFlowerBold.ttf'
      ),
      'lemonberry-sans': require('./assets/fonts/LemonberrySans.otf'
      ),
      'shorelines-script': require('./assets/fonts/ShorelinesScript.otf'
      ),
    
    });
    
  }    
  render() {
    return (
      <MenuProvider>
        <NaviTab />
      </MenuProvider>
    );
  }
}
