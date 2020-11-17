/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type IThumbnailProps = {
  name: String;
  imageURL: String;
};

type IVoteCount = {
  up: number;
  down: number;
  neutral: number;
};

type IVotes = {
  modeIndex: number;
  mapIndex: number;
  heroIndex: number;
  votes: IVoteCount;
};

interface IState {
  totalVotes: IVotes[];
}

const gameModes: String[] = ['Storm League', 'Quick Match', 'ARAM'];
const gameMaps: IThumbnailProps[] = [
  {name: 'Tomb of the SpiderQueen', imageURL: '/'},
  {name: 'Dragon Knight', imageURL: '/'},
];
const gameHeroes: IThumbnailProps[] = [
  {name: 'Lunara', imageURL: '/'},
  {name: 'Raynor', imageURL: '/'},
];

const returnInitialState = (): IState => {
  const state = {totalVotes: []};
  gameModes.forEach((mode, modeIndex) => {
    gameMaps.forEach((map, mapIndex) => {
      gameHeroes.forEach((hero, heroIndex) => {
        const voteState = {
          modeIndex,
          mapIndex,
          heroIndex,
          votes: {up: 0, down: 0, neutral: 0},
        };

        state.totalVotes.push(voteState);
      });
    });
  });
  return state;
};

const App = () => {
  console.log('state:', returnInitialState());
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>HotsMobile!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
