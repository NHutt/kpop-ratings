import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Image,
  Header,
  Button,
  Title,
  Card,
  CardItem,
} from 'native-base';
import { SQLite } from 'expo';
import { Icon } from 'react-native-elements';


const db = SQLite.openDatabase('kappaleet.db');


class Top10 extends Component {

  constructor(props) {
    super(props);
    this.state = { kappaleet: [] };
  }

  componentDidMount = () => {

  }

  haeKappaleet = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM kappale ORDER BY kA DESC, artisti ASC LIMIT 3', null, this.ok, this.virhe);
    });
  };

  ok = (tx, results) => {
    this.setState({ kappaleet: results.rows._array }); 
  };

  virhe = (tx, error) => {
    alert('Kappaleiden listaus ei onnistunut');
  }; 


  render() {

    this.haeKappaleet();

    if (this.state.kappaleet.length === 0) {
      return <Container style={styles.container}>
        <Content>
          <Text style={styles.virhe}>Ei kappaleita!</Text>
          <Text style={styles.virhe2}>Lisää jotain :)</Text>
        </Content>
      </Container>
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Title style={styles.title}> TOP 3 </Title>
          <List dataArray={this.state.kappaleet} renderRow={(kappale) =>
            <ListItem>
              <Card style={styles.card}>

                <CardItem bordered>
                    <Text style={styles.otsikko}>{kappale.artisti} - {kappale.kappale}</Text>
                </CardItem>

                <CardItem cardBody>
                    <Thumbnail style={styles.thumbnail} source={{uri: kappale.kuva}} />
                </CardItem>


                <CardItem>
                  <Text style={styles.muut}>Keskiarvo: {kappale.kA}</Text> 
                </CardItem>

              </Card>
            </ListItem>  
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({


  container: {

    backgroundColor: '#b8ced1',

  },

  virhe: {

    fontFamily: 'moon-flower-bold', 
    fontSize: 40,
    alignSelf: 'center',
    paddingTop: 150,
  
  },

  virhe2: {

    fontFamily: 'lemonberry-sans', 
    fontSize: 25,
    alignSelf: 'center',
    paddingTop: 100,
  
  },

  card: {

    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
    
  },

  title: {

    color: '#141823',
    fontFamily: 'shorelines-script', 
    fontSize: 50,
    paddingLeft: 0,
    paddingBottom: 20,
    paddingTop: 50,

  },

  thumbnail: {

    height: 200,
    width: 300,
    flex: 1,
    borderRadius: 0,
      
    
  },

  otsikko: {

    fontFamily: 'moon-flower-bold', 
    fontSize: 40,
  
  },

  muut: {

    fontFamily: 'lemonberry-sans', 
    fontSize: 22,
    alignSelf: 'center',

  }
  
});

export default Top10;
