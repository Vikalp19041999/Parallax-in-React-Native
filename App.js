
import React, {Component} from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Animated } from 'react-native';

console.disableYellowBox=true

const HEADER_MIN_HEIGHT = 70;
const HEADER_MAX_HEIGHT = 200;

export default class App extends Component{
  constructor() {
    super();
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.array = [];
  }

  componentWillMount() {
    for (var i = 1; i <= 50; i++) {
      this.array.push(i);
    }
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#212121', '#01579B'],
        extrapolate: 'clamp'
      });

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
          )}>
          {
            this.array.map((item, key) =>
              (
                <View key={key} style={styles.item}>
                  <Text style={styles.itemText}>Row {item}</Text>
                </View>
              ))
          }
        </ScrollView>

        <Animated.View style={[styles.animatedHeader, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
          <Text style={styles.headerText}>Animated Header</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    animatedHeader:
    {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },

    headerText:
    {
      color: 'white',
      fontSize: 22
    },

    item:
    {
      backgroundColor: '#E0E0E0',
      margin: 8,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },

    itemText:
    {
      color: 'black',
      fontSize: 16
    }
  });