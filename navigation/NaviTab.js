import React from 'react';
import { Icon } from 'react-native-elements'
import LisaaKappale from '../pages/LisaaKappale';
import ListaaKappaleet from '../pages/ListaaKappaleet';
import Editointi from '../pages/Editointi';
import Top10 from '../pages/Top10';
import Videot from '../pages/Videot'; 
import { createMaterialTopTabNavigator, TabBarBottom, TabBarTop, createStackNavigator } from 'react-navigation';

const NaviTab = createMaterialTopTabNavigator(
  {
    Ratings: { screen: ListaaKappaleet }, 
    New: { screen: LisaaKappale },
    
    Top10: {screen: Top10 },
    Videot: {screen: Videot},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        
        if (routeName === 'Ratings') {
          iconName = `list-alt${focused ? '' : ''}`;
        } else if (routeName === 'New') {
          iconName = `plus-circle${focused ? '' : ''}`;
       // } else if (routeName === 'Edit') {
        //  iconName = `edit${focused ? '' : ''}`;
        } else if (routeName === 'Top10') {
          iconName = `star${focused ? '' : ''}`;  
        } else if (routeName === 'Videot') {
          iconName = `youtube${focused ? '' : ''}`; 
        }
        return <Icon name={iconName} type={'font-awesome'} size={25} color={tintColor} />;
      }, 
    }),
    tabBarOptions: {
      activeTintColor: '#a85050',
      inactiveTintColor: '#b7a8a8',
      showLabel: false,
      showIcon: true,
      pressColor: '#dbc7ce',
      
      
      style: {
        backgroundColor: '#ede3d0',
        
      },

      indicatorStyle: {
        color: '#ede3d0',
      }
      
    },

    tabBarPosition: 'bottom',
    swipeEnabled: true,
  }
);

const NaviTabStack = createStackNavigator(
  {
    NaviTab: {
      screen: NaviTab,
    },
    Edit: {
      screen: Editointi,
    },

  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default NaviTabStack;
