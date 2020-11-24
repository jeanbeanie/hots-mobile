import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {IThumbnailProps} from './interfaces';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IGridProps {
  numCols: number;
  items: IThumbnailProps[];
}

const Thumbnail = (props: IThumbnailProps) => {
  const {imageURL, pressable, onClick, buttons} = props;
  return (
    <View
      style={{
        paddingBottom: 5,
        margin: 10,
      }}>
      <Pressable onPress={pressable ? onClick : null}>
        <Image
          source={imageURL ? imageURL : null}
          style={{
            borderWidth: 1,
            width: '100%',
            height: 150,
            borderColor: Colors.black,
          }}
        />
        <Text
          style={{
            color: Colors.white,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: 'center',
          }}>
          {props.name}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {buttons && buttons.map((button) => button)}
        </View>
      </Pressable>
    </View>
  );
};

const ThumbnailGrid = (props: IGridProps) => {
  const generateColumns = (): Element[] => {
    const {items, numCols} = props;
    const columns = [];
    let currentColIndex = 0;
    let nextColIndex = () =>
      currentColIndex + 1 >= numCols ? 0 : currentColIndex + 1;
    for (let i = 0; i < items.length; i++) {
      const thumbnail = <Thumbnail {...items[i]} key={i} />;
      if (columns[currentColIndex]) {
        columns[currentColIndex].push(thumbnail);
      } else {
        columns[currentColIndex] = [thumbnail];
      }
      currentColIndex = nextColIndex();
    }
    return columns;
  };

  const columns = generateColumns();

  return (
    <Grid style={{paddingBottom: 15}}>
      {columns.map((column, colIndex) => (
        <Col key={colIndex}>{column.map((item) => item)}</Col>
      ))}
    </Grid>
  );
};

export default ThumbnailGrid;
