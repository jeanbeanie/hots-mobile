import React from 'react';
import {View, Button} from 'react-native';

interface IFilterProps {
  links: {label: string; isDisabled: boolean; onClick: () => void}[];
}

const Filter = (props: IFilterProps) => {
  return (
    <View style={styles}>
      {props.links.map((link) => (
        <Button
          title={link.label}
          onPress={link.onClick}
          disabled={link.isDisabled}
        />
      ))}
    </View>
  );
};

const styles = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
};

export default Filter;