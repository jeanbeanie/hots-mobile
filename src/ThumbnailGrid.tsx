import React from 'react';
import {Text, View, Image} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {IThumbnailProps} from './interfaces';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IGridProps {
  numCols: number;
  items: IThumbnailProps[];
}

const Thumbnail = (props: IThumbnailProps) => {
  const {imageURL} = props;
  console.log('URL', imageURL);
  return (
    <View
      style={{
        paddingBottom: 10,
        margin: 10,
      }}>
      <Image
        source={imageURL ? imageURL : undefined}
        style={{borderWidth: 1, borderColor: Colors.black, height: 200}}
      />
      <Text style={{color: Colors.white, paddingTop: 10, textAlign: 'center'}}>
        {props.name}
      </Text>
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
      {columns.map((column) => (
        <Col>{column.map((item) => item)}</Col>
      ))}
    </Grid>
  );
};

export default ThumbnailGrid;
