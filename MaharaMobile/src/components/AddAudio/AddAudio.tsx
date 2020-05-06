import {
  faPauseCircle,
  faPlayCircle,
  faStopCircle
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import base64 from 'base-64';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import buttons from '../../assets/styles/buttons';
import variables from '../../assets/styles/variables';
import {MaharaFile, MaharaPendingFile, Playback} from '../../models/models';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './AddAudio.style';
import {UNRECORDED, RECORDING, RECORDED} from '../../utils/constants';

type Props = {
  setPickedFile: React.Dispatch<React.SetStateAction<MaharaFile>>;
  editItem?: MaharaPendingFile;
  i18n: I18n;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  const getButtonText = (recordStatus: string): string => {
    let buttonText = '';
    switch (recordStatus) {
      case UNRECORDED:
        buttonText = 'Record';
        break;
      case RECORDING:
        buttonText = 'Stop';
        break;
      case RECORDED:
        buttonText = 'Re-record';
        break;
      default:
        break;
    }
    return buttonText;
  };

  const [audioFile, setAudioFile] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');
  const [playButtonStatus, setPlayButtonStatus] = useState('notplaying');
  const [isRecorded, setIsRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const playStrings = {
    playing: (
      <FontAwesomeIcon
        icon={faPauseCircle}
        size={25}
        color={variables.colors.tertiary}
      />
    ),
    notplaying: (
      <FontAwesomeIcon
        icon={faPlayCircle}
        size={25}
        color={variables.colors.tertiary}
      />
    )
  };

  // Check permissions
  const checkPermissions = async () => {
    // let permission = true;

    if (Platform.OS === 'android') {
      try {
        const grantedStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: props.i18n._(t`Access permission`),
            message: props.i18n._(
              t`Allow Mahara Mobile to access photos, media, and files on your device?`
            ),
            buttonPositive: props.i18n._(t`Allow`)
          }
        );
        const grantedRecord = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: props.i18n._(t`Permission to record audio`),
            message: props.i18n._(
              t`Allow your microphone to record audio and save the files?`
            ),
            buttonPositive: props.i18n._(t`Allow`)
          }
        );

        if (!(grantedStorage === PermissionsAndroid.RESULTS.GRANTED)) {
          setIsPermissionGranted(false);
          return;
        }
        if (!(grantedRecord === PermissionsAndroid.RESULTS.GRANTED)) {
          setIsPermissionGranted(false);
          return;
        }
      } catch (err) {
        setIsPermissionGranted(false);
        // permission = false;
        // return permission;
      }
      setIsPermissionGranted(true);
      // return permission;
    }
  };

  useEffect(() => {
    checkPermissions();
  });

  // Handling recording
  const getFileSize = () => {
    const fileSize = RNFetchBlob.fs.readFile(audioFile, 'base64').then(data => {
      const decodedData = base64.decode(data);
      const bytes = decodedData.length;
      return bytes;
    });
    return fileSize;
  };

  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(() => {
        setAudioFile(result);
        setRecordButtonText(getButtonText(RECORDING));
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);
    setRecordButtonText(getButtonText(RECORDED));
    setIsRecorded(true);
    const size = await getFileSize();
    props.setPickedFile({
      name: result,
      uri: result,
      type: 'audio/m4a',
      size
    });
  };

  const handleRecord = async () => {
    // const permission = await checkPermissions();

    if (!isPermissionGranted) {
      return;
    }

    if (recordButtonText === 'Record' || recordButtonText === 'Re-record') {
      onStartRecord();
      setIsRecorded(false);
    } else {
      onStopRecord();
    }
  };

  // Handling playing
  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(audioFile);
    setIsPlaying(true);
    audioRecorderPlayer.addPlayBackListener((e: Playback) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer().catch(() => {});
        setIsPlaying(false);
        setPlayButtonStatus('notplaying');
      }
    });
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
    } catch (e) {
      // console.log(e);
    }
  };

  const handlePlay = () => {
    if (playButtonStatus === 'notplaying') {
      setPlayButtonStatus('playing');
      onStartPlay();
    } else if (playButtonStatus === 'playing') {
      setPlayButtonStatus('notplaying');
      onPausePlay();
    }
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setPlayButtonStatus('notplaying');
    setIsPlaying(false);
  };

  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.playbackButtonWrapper}>
        {isRecorded ? (
          <TouchableOpacity
            onPress={() => handlePlay()}
            accessibilityRole="button">
            <Text style={[buttons.sm, styles.smButton]}>
              {playStrings[playButtonStatus]}
            </Text>
          </TouchableOpacity>
        ) : null}
        {isPlaying ? (
          <TouchableOpacity
            onPress={() => onStopPlay()}
            accessibilityRole="button">
            <Text style={[buttons.sm, styles.smButton]}>
              <FontAwesomeIcon
                icon={faStopCircle}
                size={25}
                color={variables.colors.tertiary}
              />
            </Text>
          </TouchableOpacity>
        ) : null}
        {!isPermissionGranted ? (
          <Text style={styles.warning}>
            You need to grant the app permission in order to use this feature
          </Text>
        ) : null}
      </View>
      <View style={styles.recordButton}>
        <OutlineButton
          title={recordButtonText}
          style={recordButtonText === 'Stop' ? styles.recording : ''}
          onPress={() => handleRecord()}
          icon={recordButtonText === 'Stop' ? 'faStopCircle' : 'faMicrophone'}
        />
      </View>
    </View>
  );
};

export default withI18n()(AddAudio);
