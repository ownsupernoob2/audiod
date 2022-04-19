import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { BookNavigator } from './BookNavigator';

const AppNavigator = props => {

  return (
    <NavigationContainer>
      <BookNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
