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
import Filter from './src/Filter';
import {Col, Grid} from 'react-native-easy-grid';
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
  currentMap: number | null;
}

const App = () => {
  const returnInitialState = (): IState => {
    const initialState = {
      totalVotes: [],
      currentMap: null,
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
  const [currentMode, setCurrentMode] = useState(0);

  const returnScreenTitle = (
    modeName: string,
    mapName: string | null,
  ): string => {
    const stringTail = mapName ? `for ${mapName}` : 'by Map';
    return `Vote on the Best ${modeName} Hero ${stringTail}`;
  };

  const returnFilterLinks = () => {
    return gameModes.map((mode, modeIndex) => {
      return {
        label: mode,
        onClick: () => {
          setCurrentMode(modeIndex);
        },
        isDisabled: currentMode === modeIndex,
      };
    });
  };

  const {currentMap} = state;
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
            <Text style={styles.title}>HOTS RANKER</Text>
            <Filter links={filterLinks} />
            <Text style={styles.title}>{title}</Text>
            <Grid>
              <Col>
                <Text>a</Text>
              </Col>
              <Col>
                <Text>b</Text>
              </Col>
            </Grid>
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
  },
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
