import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import GetProfile from './GetProfile.tsx';

it('renders correctly', () => {
  renderer.create(<GetProfile />);
});
