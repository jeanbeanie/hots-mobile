import React from 'react';
import {Text} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';

interface IGridProps {
  numCols: number;
  items: IThumbnails[];
}

const ThumbnailGrid = (props: IGridProps) => {
  const generateColumns = (): Element[] => {
    const {items, numCols} = props;
    const columns = [];
    let currentColIndex = 0;
    let nextColIndex = () =>
      currentColIndex + 1 >= numCols ? 0 : currentColIndex + 1;

    for (let i = 0; i < items.length; i++) {
      const thumbnail = <Text>{items[i].name}</Text>;
      console.log('CURRENT', columns[currentColIndex]);
      if (columns[currentColIndex]) {
        columns[currentColIndex].push(thumbnail);
      } else {
        columns[currentColIndex] = [thumbnail];
      }
      currentColIndex = nextColIndex();
    }
    console.log('COLS', columns);
    return columns;
  };

  const columns = generateColumns();

  return (
    <Grid>
      {columns.map((column) => (
        <Col>{column.map((item) => item)}</Col>
      ))}
    </Grid>
  );
};

export default ThumbnailGrid;
