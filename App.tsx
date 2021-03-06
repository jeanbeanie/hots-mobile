/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 */

import React, {useState, useEffect} from 'react';
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
import {gameModes, gameMaps, gameHeroes} from './src/initialData';

type IVotes = {
  modeIndex: number;
  mapIndex: number;
  heroIndex: number;
  upVotes: number;
  downVotes: number;
  neutralVotes: number;
};

const Colors = {
  dark: '#12155C',
  white: '#fff',
  black: '#000',
};

const App = () => {
  const returnInitialState = (): IVotes[] => {
    const initialState = [];
    // TODO only iterate over active maps
    gameModes.forEach((_, modeIndex) => {
      gameMaps.forEach((__, mapIndex) => {
        gameHeroes.forEach((___, heroIndex) => {
          const voteState = {
            modeIndex,
            mapIndex,
            heroIndex,
            upVotes: 0,
            downVotes: 0,
            neutralVotes: 0,
          };

          initialState.push(voteState);
        });
      });
    });
    return initialState;
  };

  const findVotesByHeroIndex = (hero: number) => {
    let voteIndex;
    // TODO fix this find may return undefined!
    const votes = totalVotes.find(({modeIndex, mapIndex, heroIndex}, index) => {
      if (
        modeIndex === currentMode &&
        mapIndex === currentMap &&
        heroIndex === hero
      ) {
        voteIndex = index;
        return true;
      } else {
        return false;
      }
    });
    return {votes, voteIndex};
  };

  const [totalVotes, setTotalVotes] = useState(returnInitialState());
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
          setCurrentMode(modeIndex); // TODO clean next line heavily
          setCurrentMap(
            modeIndex === 2
              ? gameMaps.findIndex((map) => map.name === 'ARAM')
              : null,
          );
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

  const updateVoteState = (
    voteIndex: number,
    voteType: string,
    numVotes: number,
  ) => {
    const newVotes = [...totalVotes];
    newVotes[voteIndex][voteType] = numVotes;
    setTotalVotes(newVotes);
  };
  const generateVoteButtons = (heroIndex) => {
    const {votes, voteIndex} = findVotesByHeroIndex(heroIndex);
    const {upVotes, downVotes, neutralVotes} = votes;
    return [
      <Button
        key={`up-${heroIndex}`}
        title={`⬆️  ${upVotes}`}
        onPress={() => {
          updateVoteState(voteIndex, 'upVotes', upVotes + 1);
        }}
      />,
      <Button
        key={`down-${heroIndex}`}
        title={`⬇️  ${downVotes}`}
        onPress={() => {
          updateVoteState(voteIndex, 'downVotes', downVotes + 1);
        }}
      />,
      <Button
        key={`neutral-${heroIndex}`}
        title={`😐 ${neutralVotes}`}
        onPress={() => {
          updateVoteState(voteIndex, 'neutralVotes', neutralVotes + 1);
        }}
      />,
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

  useEffect(() => {
    console.log('RENDER');
  });

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
