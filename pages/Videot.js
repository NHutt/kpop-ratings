import React, { Component } from 'react';
import { WebView, } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('kappaleet.db');


class Videot extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount = () => {}

  render() {
    return (

          <WebView
              source={{uri: 'https://www.youtube.com/watch?v=KNWLQI5_JLc&t=0s&list=PLl7V30nGbxYr1rK5TYdGWezSx3ZfruOXS'}}
              style={{marginTop: 20}}
          />
    );
  }
}

export default Videot;
