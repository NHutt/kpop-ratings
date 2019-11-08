import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


const db = SQLite.openDatabase('kappaleet.db');


class ListaaKappaleet extends Component {

  constructor(props) {
    super(props);
    this.state = { kappaleet: [] };
  }

  componentDidMount = () => {

     db.transaction(tx => {
      let sql =
       'CREATE TABLE if not exists kappale (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'artisti text NOT NULL, ' +
        'kappale text NOT NULL, ' +
        'musiikkiArvosana integer NOT NULL, ' +
        'mvArvosana integer NOT NULL, ' +
        'koreografiaArvosana integer NOT NULL, ' +
        'lyriikatArvosana integer NOT NULL, ' +
        'kuva blob, ';

      tx.executeSql(sql, null, null, this.virhe);
    });
  }

  haeKappaleet = () => {

    /*
    db.transaction(tx => {
        tx.executeSql('delete from kappale');
    });
    */ 
     

    db.transaction(tx => {
      tx.executeSql('select * from kappale', null, this.ok, this.virhe);
    });
  };

  ok = (tx, results) => {
    this.setState({ kappaleet: results.rows._array });
  };

  //virhe = (tx, error) => {
    //alert('Kappaleiden listaus ei onnistunut');
  //}; 

  poista = id => {
    db.transaction(tx => {
      tx.executeSql('delete from kappale where id=?', [id], null, null);
    });
  }; 


   
 renderItem = kappale => {
    return (

        <ListItem>
              <Card style={styles.card}>

               <CardItem bordered>
                   
                    <Text style={styles.otsikko}>{kappale.artisti} - {kappale.kappale}</Text>
                  
                   <Right> 
                        <Menu> 
                          <MenuTrigger>
                            <Icon
                              name='more-vert'
                              color='#000000'
                              size= {25}
                            />
                          </MenuTrigger>
                          <MenuOptions customStyles={optionsStyles}>
                            <MenuOption value={1} onSelect={() => Alert.alert('Poista',
                                'Oletko aivan varma?',
                                [
                                  {text: 'Kyllä', onPress: () => this.poista(kappale.id)},

                                    ],
                                )} >
                              <Text style={{color: 'black'}}>Poista</Text>
                            </MenuOption>

                            <MenuOption value={2} onSelect={() => this.props.navigation.navigate('Edit', { id: kappale.id, artisti: kappale.artisti, kappale:     kappale.kappale, musiikkiArvosana: kappale.musiikkiArvosana, mvArvosana: kappale.mvArvosana, koreografiaArvosana: kappale.koreografiaArvosana, lyriikatArvosana: kappale.lyriikatArvosana, kuva: kappale.kuva, })}>
                              <Text style={{color: 'black'}}>Muokkaa</Text> 
                            </MenuOption>

                          </MenuOptions>
                        </Menu>
                  </Right> 
                  
                </CardItem>

                <CardItem cardBody>
                    <Thumbnail style={styles.thumbnail} source={{uri: kappale.kuva}} />
                </CardItem>

                <CardItem>
                  <Text style={styles.muut}>Arvosana musiikille: {kappale.musiikkiArvosana}</Text>
                </CardItem>

                <CardItem>
                  <Text style={styles.muut}>Arvosana musiikkivideolle: {kappale.mvArvosana}</Text>
                </CardItem>

                <CardItem>
                  <Text style={styles.muut}>Arvosana koreografialle: {kappale.koreografiaArvosana}</Text>
                </CardItem>

                <CardItem>
                  <Text style={styles.muut}>Arvosana lyriikoille: {kappale.lyriikatArvosana}</Text>
                </CardItem>

                <CardItem>
                    <Icon
                      reverse
                      name='edit'
                      type='font-awesome'
                      color='#9b9393'
                      size={25}
                      onPress={() => this.props.navigation.navigate('Edit', { id: kappale.id, artisti: kappale.artisti, kappale: kappale.kappale, 
                      musiikkiArvosana: kappale.musiikkiArvosana, mvArvosana: kappale.mvArvosana, koreografiaArvosana: kappale.koreografiaArvosana,                                        lyriikatArvosana: kappale.lyriikatArvosana, kuva: kappale.kuva, })}
                    />
                </CardItem>
              </Card>
            </ListItem>  
    );
  };
  


  render() {

    this.haeKappaleet();

    if (this.state.kappaleet.length === 0) {
      return <Container style={styles.container}>
        <Content style={styles.content}>
          <Text style={styles.virhe}>Ei kappaleita!</Text>
          <Text style={styles.virhe2}>Lisää jotain :)</Text>
        </Content>
      </Container>
    }
    return (
      <Container style={styles.container}>
        <Content style={styles.contentJoku}>
          <Title style={styles.title}> K-poppia </Title>
          <List dataArray={this.state.kappaleet} renderRow={this.renderItem} />
        </Content>
      </Container> 
    );
  }
}

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#a85050', 
    padding: 5,
    width: 100, 
  },
  optionsWrapper: {
    backgroundColor: 'white',
  },
  optionWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#b8ced1',

  },

  contentJoku:{

    flex: 1,
    
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
    paddingLeft: 20,
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

  muut: {

    fontFamily: 'lemonberry-sans', 
    fontSize: 22,
    alignSelf: 'center',

  }
  

});

export default ListaaKappaleet;
