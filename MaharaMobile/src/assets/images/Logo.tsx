import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class LogoSvg extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'flex-start', justifyContent: 'center', padding: 15, paddingLeft: 40 },
        ]}
      >
        <Svg width="80" height="42" viewBox="0 0 203.026 106.9">
          <G id="Layer_2" data-name="Layer 2">
            <G id="Layer_1-2" data-name="Layer 1">
              <Path d="M202.8,80.8a3.292,3.292,0,0,1,1,1.8L196,83.9a3.194,3.194,0,0,1,.3-1.4,3.528,3.528,0,0,1,.8-1.3,3.045,3.045,0,0,1,1.3-.9,5.33,5.33,0,0,1,1.9-.4A3.18,3.18,0,0,1,202.8,80.8ZM205,97.5a11.543,11.543,0,0,0,3.3-1,3.265,3.265,0,0,0,1.9-3.1,3.371,3.371,0,0,0-.5-1.7,3.745,3.745,0,0,0-1.2-1.3,11.6,11.6,0,0,1-2.7,1.1,13.449,13.449,0,0,1-3.5.5,8.627,8.627,0,0,1-3.6-.8,4.29,4.29,0,0,1-2.1-2.3l11.3-1.7a5.285,5.285,0,0,0,2.4-1,2.953,2.953,0,0,0,.9-2.4,10.065,10.065,0,0,0-.8-3.9,9.73,9.73,0,0,0-2.2-3.1,10.53,10.53,0,0,0-3.4-2,13.55,13.55,0,0,0-8.6,0,8.178,8.178,0,0,0-3.6,2.1,9.84,9.84,0,0,0-2.6,3.6,11.775,11.775,0,0,0-1,5.2,12.538,12.538,0,0,0,1,5.3,11.871,11.871,0,0,0,2.7,3.8,11.33,11.33,0,0,0,4,2.3,15.88,15.88,0,0,0,5,.8C202.6,97.8,203.8,97.7,205,97.5ZM185.6,70.6a4.178,4.178,0,0,0-.3-1.8,3.134,3.134,0,0,0-.8-1.1,2.106,2.106,0,0,0-1.3-.5,9.722,9.722,0,0,0-1.8-.1,13.552,13.552,0,0,0-2,.2,12.993,12.993,0,0,0-1.5.3V94a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,13.552,13.552,0,0,0,2-.2,12.993,12.993,0,0,0,1.5-.3Zm-12.2,7.8a4.178,4.178,0,0,0-.3-1.8,3.134,3.134,0,0,0-.8-1.1A2.106,2.106,0,0,0,171,75a9.722,9.722,0,0,0-1.8-.1,13.552,13.552,0,0,0-2,.2,12.993,12.993,0,0,0-1.5.3V94a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,1.9,1.9,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,13.552,13.552,0,0,0,2-.2,12.993,12.993,0,0,0,1.5-.3Zm-7-6.8a4.6,4.6,0,0,0,6.2,0,4,4,0,0,0,1.2-2.9,3.847,3.847,0,0,0-1.2-2.9,4.6,4.6,0,0,0-6.2,0,4,4,0,0,0-1.2,2.9A3.7,3.7,0,0,0,166.4,71.6ZM148.2,91.5A3.337,3.337,0,0,1,147,91V81.1a12.129,12.129,0,0,1,1.4-.5,6.959,6.959,0,0,1,1.6-.2,4.158,4.158,0,0,1,3.2,1.4,6.492,6.492,0,0,1,1.2,4.3,6.677,6.677,0,0,1-1.2,4.3,3.922,3.922,0,0,1-3.3,1.4C149.3,91.7,148.7,91.6,148.2,91.5Zm-8.9.2a4.226,4.226,0,0,0,2,3.6,15.123,15.123,0,0,0,3.6,1.8,15.33,15.33,0,0,0,5.1.7,16.522,16.522,0,0,0,5.1-.8,10.69,10.69,0,0,0,3.9-2.2,9.7,9.7,0,0,0,2.5-3.7,13.808,13.808,0,0,0,.9-5.2,13.638,13.638,0,0,0-.9-5.1,10.771,10.771,0,0,0-2.4-3.7,11.809,11.809,0,0,0-3.5-2.3,11.5,11.5,0,0,0-4.1-.8,16.413,16.413,0,0,0-2.3.2,10.408,10.408,0,0,0-2.2.6V70.3a4.178,4.178,0,0,0-.3-1.8,3.134,3.134,0,0,0-.8-1.1,2.106,2.106,0,0,0-1.3-.5,9.722,9.722,0,0,0-1.8-.1,14.919,14.919,0,0,0-2.1.2,9.591,9.591,0,0,0-1.5.3V91.7Zm-18.1-10a3.75,3.75,0,0,1,6,0,7.257,7.257,0,0,1,1,4.2,7.257,7.257,0,0,1-1,4.2,3.388,3.388,0,0,1-2.9,1.5,3.442,3.442,0,0,1-3-1.5,7.359,7.359,0,0,1-1.1-4.3A6.427,6.427,0,0,1,121.2,81.7Zm14-.6a10.771,10.771,0,0,0-2.4-3.7A11.226,11.226,0,0,0,129,75a12.937,12.937,0,0,0-4.9-.8,15.251,15.251,0,0,0-4.9.8,10.476,10.476,0,0,0-3.8,2.3A10.294,10.294,0,0,0,113,81a12.951,12.951,0,0,0-.9,4.9,12.592,12.592,0,0,0,.9,4.9,10.771,10.771,0,0,0,2.4,3.7,9.7,9.7,0,0,0,3.8,2.3,15.406,15.406,0,0,0,9.8,0,10.476,10.476,0,0,0,3.8-2.3,9.5,9.5,0,0,0,2.4-3.7,13.477,13.477,0,0,0,.9-5A12.667,12.667,0,0,0,135.2,81.1Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M82,75c-1.2-1.2-4.8-.8-6.8-.4V93.8a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3v-16a9.292,9.292,0,0,1,1-.5,3.543,3.543,0,0,1,3.4.3,2.209,2.209,0,0,1,.8,2V93.6a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,13.4,13.4,0,0,0,2-.1,12.993,12.993,0,0,0,1.5-.3V81.2a3.581,3.581,0,0,1,1.1-.6,3.529,3.529,0,0,1,1.4-.3,3.281,3.281,0,0,1,2.1.6,2.481,2.481,0,0,1,.8,2V93.8a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3V82.6a8.7,8.7,0,0,0-.8-3.9,6.723,6.723,0,0,0-2.1-2.6,8.256,8.256,0,0,0-3-1.4,12.7,12.7,0,0,0-3.4-.5,12.237,12.237,0,0,0-4.1.6A13.069,13.069,0,0,0,92.6,76a9.336,9.336,0,0,0-3.4-1.5,14.45,14.45,0,0,0-4.1-.3A11.545,11.545,0,0,0,82,75Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M181.6,42.6c.4-.2.9-.3,1.4-.5.6-.1,1.2-.3,1.8-.4s1.3-.2,2-.3a13.4,13.4,0,0,1,2-.1,11.731,11.731,0,0,0,.5-1.1,5.067,5.067,0,0,0,.2-1.3,3.058,3.058,0,0,0-1.3-2.8,6.063,6.063,0,0,0-3.5-.8,21.115,21.115,0,0,0-2.6.2,12.213,12.213,0,0,0-2.6.6,15.546,15.546,0,0,0-2.3.8,7.845,7.845,0,0,0-1.8,1.1,3.339,3.339,0,0,0-1.1,1.3,3.425,3.425,0,0,0-.4,1.8V54.8a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3V42.6Zm-36.1,1.7c0-3-.8-5.2-2.5-6.7a10.171,10.171,0,0,0-7-2.3,11.153,11.153,0,0,0-2.7.3c-.8.2-1.4.4-1.8.5V31.6a4.178,4.178,0,0,0-.3-1.8,3.134,3.134,0,0,0-.8-1.1,2.106,2.106,0,0,0-1.3-.5,9.722,9.722,0,0,0-1.8-.1,13.552,13.552,0,0,0-2,.2,12.993,12.993,0,0,0-1.5.3V55.1a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3v-16a3.922,3.922,0,0,1,1.3-.5,4.678,4.678,0,0,1,1.7-.2,3.566,3.566,0,0,1,2.3.8,3.273,3.273,0,0,1,.9,2.6V55a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3V44.3Zm-40.4-8.8a20.523,20.523,0,0,0-3.1.7,4.067,4.067,0,0,0-1.8,1.2,2.883,2.883,0,0,0-.6,1.9,3.922,3.922,0,0,0,.4,1.8,3.448,3.448,0,0,0,1,1.3,13.164,13.164,0,0,1,3-.9,18.61,18.61,0,0,1,3.4-.4,7.667,7.667,0,0,1,3.4.6,1.961,1.961,0,0,1,1.2,1.9v.3l-6,.6a10.7,10.7,0,0,0-5.8,2.1,6.238,6.238,0,0,0-1.9,4.8,7.308,7.308,0,0,0,.8,3.3,6.589,6.589,0,0,0,2.1,2.3,9.96,9.96,0,0,0,3.3,1.4,18.95,18.95,0,0,0,3.9.5,7.605,7.605,0,0,0,4.3-1.2c.6.6,3.2,1.3,6.7.3V43.7a8.414,8.414,0,0,0-.8-3.7,7.84,7.84,0,0,0-2.2-2.6,9.285,9.285,0,0,0-3.5-1.5,21.381,21.381,0,0,0-4.5-.5A18.738,18.738,0,0,0,105.1,35.5Zm1.4,17.2a1.8,1.8,0,0,1-.7-1.5,1.6,1.6,0,0,1,.8-1.4,4.064,4.064,0,0,1,2.1-.5L112,49v3.6a3.921,3.921,0,0,1-1.4.4,11.135,11.135,0,0,1-1.7.2A4.265,4.265,0,0,1,106.5,52.7ZM68.2,36.1c-1.2-1.2-4.8-.8-6.8-.4V54.9a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1A7.828,7.828,0,0,0,69,58V42a9.292,9.292,0,0,1,1-.5,3.543,3.543,0,0,1,3.4.3,2.209,2.209,0,0,1,.8,2V54.7a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,13.4,13.4,0,0,0,2-.1,12.993,12.993,0,0,0,1.5-.3V42.3a3.581,3.581,0,0,1,1.1-.6,3.529,3.529,0,0,1,1.4-.3,3.281,3.281,0,0,1,2.1.6,2.481,2.481,0,0,1,.8,2V54.9a4.178,4.178,0,0,0,.3,1.8,3.134,3.134,0,0,0,.8,1.1,2.106,2.106,0,0,0,1.3.5,9.722,9.722,0,0,0,1.8.1,12.75,12.75,0,0,0,2-.1,7.828,7.828,0,0,0,1.4-.3V43.7a8.7,8.7,0,0,0-.8-3.9A6.723,6.723,0,0,0,92,37.2a8.256,8.256,0,0,0-3-1.4,12.7,12.7,0,0,0-3.4-.5,12.237,12.237,0,0,0-4.1.6,13.069,13.069,0,0,0-2.7,1.2,9.336,9.336,0,0,0-3.4-1.5,13.079,13.079,0,0,0-3.6-.3A10.726,10.726,0,0,0,68.2,36.1Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M168.9,39.9a7.84,7.84,0,0,0-2.2-2.6,9.285,9.285,0,0,0-3.5-1.5,21.381,21.381,0,0,0-4.5-.5c-1.1,0-2.2.1-3.4.2a20.523,20.523,0,0,0-3.1.7,4.067,4.067,0,0,0-1.8,1.2,2.883,2.883,0,0,0-.6,1.9,3.922,3.922,0,0,0,.4,1.8,3.448,3.448,0,0,0,1,1.3,13.164,13.164,0,0,1,3-.9,18.61,18.61,0,0,1,3.4-.4,7.667,7.667,0,0,1,3.4.6,1.961,1.961,0,0,1,1.2,1.9v.3l-6,.6a10.7,10.7,0,0,0-5.8,2.1,6.238,6.238,0,0,0-1.9,4.8,7.308,7.308,0,0,0,.8,3.3,6.589,6.589,0,0,0,2.1,2.3,9.96,9.96,0,0,0,3.3,1.4,18.95,18.95,0,0,0,3.9.5,7.605,7.605,0,0,0,4.3-1.2c.6.6,3.2,1.3,6.7.3V43.7A6.667,6.667,0,0,0,168.9,39.9Zm-6.7,12.7a3.921,3.921,0,0,1-1.4.4,11.135,11.135,0,0,1-1.7.2,3.845,3.845,0,0,1-2.4-.6,1.8,1.8,0,0,1-.7-1.5,1.6,1.6,0,0,1,.8-1.4,4.064,4.064,0,0,1,2.1-.5l3.3-.3v3.7Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M210.8,39.9a7.84,7.84,0,0,0-2.2-2.6,9.285,9.285,0,0,0-3.5-1.5,21.381,21.381,0,0,0-4.5-.5c-1.1,0-2.2.1-3.4.2a20.523,20.523,0,0,0-3.1.7,4.067,4.067,0,0,0-1.8,1.2,2.883,2.883,0,0,0-.6,1.9,3.922,3.922,0,0,0,.4,1.8,3.448,3.448,0,0,0,1,1.3,13.164,13.164,0,0,1,3-.9,18.61,18.61,0,0,1,3.4-.4,7.667,7.667,0,0,1,3.4.6,1.961,1.961,0,0,1,1.2,1.9v.3l-6,.6a10.7,10.7,0,0,0-5.8,2.1,6.238,6.238,0,0,0-1.9,4.8,7.308,7.308,0,0,0,.8,3.3,6.589,6.589,0,0,0,2.1,2.3,9.96,9.96,0,0,0,3.3,1.4,18.95,18.95,0,0,0,3.9.5,7.605,7.605,0,0,0,4.3-1.2c.6.6,3.2,1.3,6.7.3V43.7A6.667,6.667,0,0,0,210.8,39.9Zm-6.7,12.7a3.921,3.921,0,0,1-1.4.4,11.135,11.135,0,0,1-1.7.2,3.845,3.845,0,0,1-2.4-.6,1.8,1.8,0,0,1-.7-1.5,1.6,1.6,0,0,1,.8-1.4,4.064,4.064,0,0,1,2.1-.5l3.3-.3v3.7Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M61.7,94.3c0-3.7-4.2,13.6-24.2,13.6-13,0-21.9-8.3-21.9-20.8,0-11.9,8.2-23.5,13.2-29.5,1.9,2.8,6.6,9.9,7.5,11.4,1.2,2,3.1,7.1-.1,7.7-4.5.8-4.7-7.2-4.8-9.4-.1-.7-1.1-.8-1.5-.2-1.4,2.6-2.4,10.5,1.7,14A6.317,6.317,0,0,0,42,77.9a39.33,39.33,0,0,1,4.7,14.7.561.561,0,0,0,1.1,0c2.1-11.9-3.5-20.1-5.3-23.8S33,54.3,31.7,52.1s-4.9-8.6-4.9-15.3c0-10.3,8.5-20.2,10.1-20.2s10.5,8.2,10.5,20.5a23.831,23.831,0,0,1-2.3,10.6,1.171,1.171,0,0,1-2,.1c-4.9-7.6-5-9.2-1.9-11.5,2.1-1.5-7.9-5.6-7.5,2.9.2,4.5,6.6,13.6,8.1,15.4s10.5-2,10.5-18.2C52.1,20.2,38.1,9.3,36.4,9.3S20.7,22.6,20.7,36.4a32.9,32.9,0,0,0,5.4,17.4c-.3.3-17.8,14.3-17.6,35,.2,15.9,10.8,27.4,28.3,27.4C52.1,116.2,61.7,105.3,61.7,94.3Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M54.3,71.3l-.9-.7.9.7h0l-.9-.7.9.7a11.45,11.45,0,0,1,2-1.7,10.344,10.344,0,0,1,2.1-1.1A7.512,7.512,0,0,1,61,68a8.676,8.676,0,0,1,2.8.5,14.369,14.369,0,0,1,3.3,1.8,8.175,8.175,0,0,1,.9.8l.2.2h0l.9-.9-.9.9h0l.9-.9-.9.9a2.476,2.476,0,0,0,3.6-3.4,16.388,16.388,0,0,0-3.1-2.5,17.933,17.933,0,0,0-3.4-1.7,12.5,12.5,0,0,0-8.8,0,13.8,13.8,0,0,0-4.4,2.6c-1,.9-1.6,1.5-1.7,1.6a2.511,2.511,0,0,0,.3,3.5,2.369,2.369,0,0,0,3.6-.1Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Path d="M60.1,78.7c.2-.2.3-.3.5-.3.1-.1.2-.1.4-.1a.367.367,0,0,1,.3.1c.1.1.3.2.5.4a2.475,2.475,0,0,0,3.5-3.5,6.606,6.606,0,0,0-2-1.4,5.54,5.54,0,0,0-4.6,0,6.606,6.606,0,0,0-2,1.4,2.417,2.417,0,0,0,0,3.5,2.387,2.387,0,0,0,3.4-.1Z" transform="translate(-8.502 -9.304)" fill="#fff" />
              <Circle cx="52.502" cy="76.2" r="2.5" fill="#fff" />
            </G>
          </G>
        </Svg>
      </View>
    )
  }
};