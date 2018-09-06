import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";

import ProductDetail from "./ProductDetail";
import Searches from "./Search";
import { Ionicons } from "@expo/vector-icons"
import ProductList from './Products';

const ListStack = createStackNavigator(
  {
    List: {
      screen: ProductList
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product List",
      headerStyle: {
        backgroundColor: "#f57d1e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        
      },
     
      
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Searches
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      title: "Search",
      headerStyle: {
        backgroundColor: "#f57d1e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    },
    
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    List: ListStack,
    Search: SearchStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list${focused ? "" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    headerStyle: {
      backgroundColor: 'white',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
  },
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#f57d1e",
      activeBackgroundColor : "#f57d1e",
      inactiveBackgroundColor : "black"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
      /*  navigation={{
         dispatch: this.props.dispatch,
         state: this.props.navState,
         addListener
       }} */
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
