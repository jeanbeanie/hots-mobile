/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {gameModes, gameMaps, gameHeroes} from './src/initialData';
type IThumbnailProps = {
  name: string;
  imageURL: string;
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
  currentMode: number;
  currentMap: number | null;
}

interface IFilterProps {
  links: {label: string; onClick: () => void}[];
}

const Filter = (props: IFilterProps) => {
  return (
    <>
      {props.links.map((link) => (
        <Text>{link.label}</Text>
      ))}
    </>
  );
};

const App = () => {
  const returnInitialState = (): IState => {
    const initialState = {
      totalVotes: [],
      currentMode: 0,
      currentMap: null,
    };
    gameModes.forEach((mode, modeIndex) => {
      gameMaps.forEach((map, mapIndex) => {
        gameHeroes.forEach((hero, heroIndex) => {
          const voteState = {
            modeIndex,
            mapIndex,
            heroIndex,
            votes: {up: 0, down: 0, neutral: 0},
          };

          initialState.totalVotes.push(voteState);
        });
      });
    });
    return initialState;
  };

  const [state, setState] = useState(returnInitialState());

  const returnScreenTitle = (
    modeName: string,
    mapName: string | null,
  ): string => {
    const stringTail = mapName ? `for ${mapName}` : 'by Map';
    return `Best ${modeName} Hero ${stringTail}`;
  };

  const returnFilterLinks = () => {
    return gameModes.map((mode) => {
      return {label: mode, onClick: () => {}};
    });
  };

  const {currentMode, currentMap} = state;
  const title = returnScreenTitle(
    gameModes[currentMode],
    currentMap ? gameMaps[currentMap].name : null,
  );
  const filterLinks = returnFilterLinks();
  console.log('LINKS', filterLinks, 'STATE', state);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>HotsMobile!</Text>
            <Filter links={filterLinks} />
            <Text>{title}</Text>
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
