import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Title,
  Header,
  Picker
} from 'native-base';

import { SQLite, ImagePicker, Permissions } from 'expo';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'


const db = SQLite.openDatabase('kappaleet.db');

class Editointi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      artisti: '',
      kappale: '',
      musiikkiArvosana: undefined,  
      mvArvosana: undefined,
      koreografiaArvosana: undefined,
      lyriikatArvosana: undefined,
      kuva: null,
    };
    this.kasittelePaivita = this.kasittelePaivita.bind(this); 
    this.kasitteleTyhjenna = this.kasitteleTyhjenna.bind(this);
  }

  componentDidMount = () => {

      this.setState({id:this.props.navigation.state.params.id});
      this.setState({artisti:this.props.navigation.state.params.artisti})
      this.setState({kappale:this.props.navigation.state.params.kappale})
      this.setState({musiikkiArvosana:this.props.navigation.state.params.musiikkiArvosana})
      this.setState({mvArvosana:this.props.navigation.state.params.mvArvosana})
      this.setState({koreografiaArvosana:this.props.navigation.state.params.koreografiaArvosana})
      this.setState({lyriikatArvosana:this.props.navigation.state.params.lyriikatArvosana})
      this.setState({kuva:this.props.navigation.state.params.kuva})

  }  

  kasittelePaivita = (id) => {
    db.transaction(tx => {
      let sql =
        'UPDATE kappale set artisti=?, kappale=?, musiikkiarvosana=?, mvArvosana=?, koreografiaArvosana=?, lyriikatArvosana=?, kA=?, kuva=? WHERE id=?';
      
      var lasku =
        (Number(this.state.musiikkiArvosana) +
          Number(this.state.mvArvosana) +
          Number(this.state.koreografiaArvosana) +
          Number(this.state.lyriikatArvosana)) / 4;  

      var kA = lasku.toFixed(2); 


      tx.executeSql(
        sql,
        [
          this.state.artisti,
          this.state.kappale,
          this.state.musiikkiArvosana,
          this.state.mvArvosana,
          this.state.koreografiaArvosana,
          this.state.lyriikatArvosana,
          kA,
          this.state.kuva,
          this.props.navigation.state.params.id
        ],
        this.paivitys,
        this.virhe
      );
    });
  };

  paivitys = () => {
    Alert.alert('Jee :)', 'Kappaleen tiedot päivitettiin onnistuneesti!', [
      
       {text: 'Takaisin listaukseen', onPress: () => this.props.navigation.navigate('Ratings')}

    ]); 
  };
  
  virhe = (t, error) => {
    alert(error);
  };

  kasitteleTyhjenna() {
    this.setState({
      artisti: '',
      kappale: '',
      musiikkiArvosana: undefined,
      mvArvosana: undefined,
      koreografiaArvosana: undefined,
      lyriikatArvosana: undefined,
      kuva: null,
    });
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  haeKuva = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ kuva: result.uri });
    }
  };

  onValueChange1(value: integer) {
    this.setState({
      musiikkiArvosana: value
    });
  }

  onValueChange2(value: integer) {
    this.setState({
      mvArvosana: value
    });
  }

  onValueChange3(value: integer) {
    this.setState({
      koreografiaArvosana: value
    });
  }

  onValueChange4(value: integer) {
    this.setState({
      lyriikatArvosana: value
    });
  }

  poista = id => {
    db.transaction(tx => {
      tx.executeSql('delete from kappale where id=?', [id], null, null);
    });
  }; 

  render() {
    return (
      <Container>
        <Content style={styles.container}>
          <Title style={styles.title}>Muokkaa kappaletta</Title>
          <Form>
            
            <View style={styles.button0}>  
              <Icon
                reverse
                name='image'
                type='font-awesome'
                color='#517fa4'
                size={35}
                onPress={this.haeKuva}
              />
            </View>

            {this.state.kuva && (
              <Image source={{ uri: this.state.kuva }} style={styles.image} />
            )}

     
            <Item></Item>
            <Item inlineLabel>
              <Label style={styles.label}>Artisti:</Label>
              <Input
                value={this.state.artisti}
                onChangeText={text => this.setState({ artisti: text })}
              />

              
            </Item>

            <Item inlineLabel>
              <Label style={styles.label}>Kappale:</Label>
              <Input
                value={this.state.kappale}
                onChangeText={text => this.setState({ kappale: text })}
              />
            </Item> 

            <KeyboardAvoidingView>
            <ScrollView>

            <Item picker>
              <Label style={styles.label2}>Arvosana musiikille:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{marginRight: 30, marginLeft: 68}}  
                placeholder="Valitse!"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.musiikkiArvosana}
                onValueChange={this.onValueChange1.bind(this)}
              >
                <Picker.Item label="-" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Item>

            </ScrollView>
            </KeyboardAvoidingView>


            <KeyboardAvoidingView>
            <ScrollView>

            <Item picker>
              <Label style={styles.label2}>Arvosana musiikkivideolle:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{marginRight: 30, marginLeft: 14}}  
                placeholder="Valitse!"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.mvArvosana}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="-" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Item>

            </ScrollView>
            </KeyboardAvoidingView>


            <KeyboardAvoidingView>
            <ScrollView>  

            <Item picker>
              <Label style={styles.label2}>Arvosana koreografialle:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{marginRight: 30, marginLeft: 29}}  
                placeholder="Valitse!"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.koreografiaArvosana}
                onValueChange={this.onValueChange3.bind(this)}
              >
                <Picker.Item label="-" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Item>

            </ScrollView>
            </KeyboardAvoidingView>

            <KeyboardAvoidingView>
            <ScrollView>

            <Item picker>
              <Label style={styles.label2}>Arvosana lyriikoille:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{marginRight: 30, marginLeft: 70}}  
                placeholder={this.state.lyriikatArvosana}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                 
                selectedValue={this.state.lyriikatArvosana}
                onValueChange={this.onValueChange4.bind(this)}
              >
                <Picker.Item label="-" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </Item>

            </ScrollView>
            </KeyboardAvoidingView>
              
            <View style={styles.buttonContainer}>
              <View style={styles.button2}>
                <Icon
                  reverse
                  name='trash'
                  type='font-awesome'
                  color='#a45151'
                  size={35}
                  onPress={this.kasitteleTyhjenna}
                  />
                </View>
              
              <View style={styles.button1}>
              
                <Icon
                  reverse
                  name='save'
                  type='font-awesome'
                  color='#76913d'
                  size= {35}
                  onPress={this.kasittelePaivita}
                  />
              </View>
            </View>         
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  image: {
    flex: 1,
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 13,
    marginBottom: 20,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#b8ced1',
    marginLeft: -15
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    marginBottom: 40,
  },


  button0: {
   
    alignSelf: 'center',
    marginBottom: 30
   
  },

  button1: {

    marginRight: 10,
    marginTop: 10,
    position: 'absolute',
    right: 20,
    top: 30,  
    marginBottom: 18,
    
  },

  button2: {

    marginRight: 10,
    marginTop: 10,
    marginLeft: 40,

  },

  label: {

    fontFamily: 'lemonberry-sans',
    fontSize: 25,
    color: '#141823',
    marginLeft: 20

  },

  label2: {

    fontFamily: 'lemonberry-sans',
    fontSize: 25,  
    color: '#141823',
    marginLeft: 36

  },

  title: {

    fontFamily: 'moon-flower-bold',
    fontSize: 40,
    color: '#141823',
    paddingBottom: 50,
    marginLeft: 5, 
    paddingTop: 50,

  },
});

export default Editointi;