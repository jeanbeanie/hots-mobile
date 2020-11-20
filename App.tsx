/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
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

  const findVotesByHeroIndex = (hero: number) => {
    return state.totalVotes.find(({modeIndex, mapIndex, heroIndex}) => {
      return (
        modeIndex === currentMode &&
        mapIndex === currentMap &&
        heroIndex === hero
      );
    }).votes;
  };

  const [state] = useState(returnInitialState());
  const [currentMap, setCurrentMap] = useState(null);
  const [currentMode, setCurrentMode] = useState(0);
  const {height} = Dimensions.get('window');

  const returnScreenTitle = (): string => {
    const modeName = gameModes[currentMode].name;
    const mapName = currentMap !== null ? gameMaps[currentMap].name : null;
    const returnStringTail = mapName ? `for ${mapName}` : 'by Map';

    return `Vote on the Best ${modeName} Hero ${
      modeName === 'ARAM' ? '' : returnStringTail
    }`;
  };

  const returnFilterLinks = () => {
    return gameModes.map((mode, modeIndex) => {
      return {
        label: mode.name,
        onClick: () => {
          setCurrentMode(modeIndex);
          setCurrentMap(null);
        },
        isDisabled: currentMode === modeIndex,
      };
    });
  };

  const returnActiveMaps = () => {
    return gameMaps.filter((map) =>
      gameModes[currentMode].activeMaps.includes(map.key),
    );
  };

  const returnMapsWithCallbacks = (maps) => {
    return maps.map((gameMap, gameMapIndex) => {
      return {
        ...gameMap,
        pressable: true,
        onClick: () => {
          setCurrentMap(gameMapIndex);
        },
      };
    });
  };

  const generateVoteButtons = (heroIndex) => {
    const votes = findVotesByHeroIndex(heroIndex);
    return [
      <Button title={`UPVOTE (${votes.up})`} />,
      <Button title={`DOWNVOTE (${votes.down})`} />,
      <Button title={`MEH VOTE (${votes.neutral})`} />,
    ];
  };

  const returnHeroesWithButtons = () => {
    return gameHeroes.map((hero, heroIndex) => {
      return {
        ...hero,
        pressable: false,
        buttons: generateVoteButtons(heroIndex),
      };
    });
  };

  const returnGridItems = (): IThumbnailProps[] => {
    if (currentMap !== null || gameModes[currentMode].name === 'ARAM') {
      return returnHeroesWithButtons();
    } else {
      const activeMaps = returnActiveMaps();
      return returnMapsWithCallbacks(activeMaps);
    }
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
