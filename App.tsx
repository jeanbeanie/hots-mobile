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
  Dimensions,
} from 'react-native';
import Filter from './src/Filter';
import ThumbnailGrid from './src/ThumbnailGrid';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {gameModes, gameMaps, gameHeroes} from './src/initialData';

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

const App = () => {
  const returnInitialState = (): IState => {
    const initialState = {
      totalVotes: [],
    };
    gameModes.forEach((_, modeIndex) => {
      gameMaps.forEach((__, mapIndex) => {
        gameHeroes.forEach((___, heroIndex) => {
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

  const [state] = useState(returnInitialState());
  const [currentMap, setCurrentMap] = useState(null);
  const [currentMode, setCurrentMode] = useState(0);
  const {height} = Dimensions.get('window');

  const returnScreenTitle = (): string => {
    const modeName = gameModes[currentMode];
    const mapName = currentMap !== null ? gameMaps[currentMap].name : null;
    const stringTail = mapName ? `for ${mapName}` : 'by Map';

    return `Vote on the Best ${modeName} Hero ${stringTail}`;
  };

  const returnFilterLinks = () => {
    return gameModes.map((mode, modeIndex) => {
      return {
        label: mode,
        onClick: () => {
          setCurrentMode(modeIndex);
          setCurrentMap(null);
        },
        isDisabled: currentMode === modeIndex,
      };
    });
  };

  const returnMapsWithCallbacks = () => {
    return gameMaps.map((gameMap, gameMapIndex) => {
      return {
        ...gameMap,
        onClick: () => {
          setCurrentMap(gameMapIndex);
        },
      };
    });
  };

  const returnGridItems = (): IThumbnailProps[] => {
    return currentMap !== null ? gameHeroes : returnMapsWithCallbacks();
  };

  /* RENDER */
  const title = returnScreenTitle();
  const filterLinks = returnFilterLinks();
  const gridItems = returnGridItems();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{...styles.body, minHeight: height, height: '100%'}}>
            <Text style={styles.title}>HOTS RANKER</Text>
            <Filter links={filterLinks} />
            <Text style={styles.title}>{title}</Text>
            <ThumbnailGrid numCols={2} items={gridItems} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.white,
  },
  scrollView: {
    backgroundColor: Colors.dark,
    minHeight: 200,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.dark,
  },
});

export default App;
