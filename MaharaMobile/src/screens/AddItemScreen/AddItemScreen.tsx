import {I18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import buttons from '../../assets/styles/buttons';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import outlineButtonStyles from '../../components/UI/OutlineButton/OutlineButton.style';
import UploadForm from '../../components/UploadForm/UploadForm';
import {
  MaharaFile,
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {selectAllUploadFiles} from '../../reducers/uploadFilesReducer';
import {selectAllJEntries} from '../../reducers/uploadJEntriesReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import {selectUserTags} from '../../reducers/userTagsReducer';
import {AUDIO, FILE, PHOTO} from '../../utils/constants';
import {isMaharaPendingFile} from '../../utils/helperFunctions';
import styles from './AddItemScreen.style';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userName: string;
  token: string;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  url: string;
  uploadList: {
    files: Array<MaharaPendingFile>;
  };
  formType: string;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const AddItemScreen = (props: Props) => {
  let initialPickedFileState: MaharaFile = {
    name: '',
    size: 0,
    type: '',
    uri: ''
  };
  let isEditing = false;

  // Check Adding or Editing
  // Populate Uploadform with existing details and set 'type' so headerTitle is accurate
  const itemToEdit:
    | MaharaPendingFile
    | PendingJournalEntry = props.navigation.getParam('itemToEdit');
  if (itemToEdit) {
    isEditing = true;
    if (isMaharaPendingFile(itemToEdit)) {
      const maharaPendingFile: MaharaPendingFile = itemToEdit;
      initialPickedFileState = maharaPendingFile.maharaFormData.filetoupload;
    }
  }

  // State
  const formType = props.navigation.getParam('formType');
  const [pickedFile, setPickedFile] = useState<MaharaFile>(
    initialPickedFileState
  );

  const [filePickerButtonText, setFilePickerButtonText] = useState(
    props.navigation.getParam('itemToEdit')
      ? props.i18n._(t`Select a different file`)
      : props.i18n._(t`Select a file`)
  );

  const takePhoto = () => {
    const options = {
      title: props.i18n._(t`Select image`),
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert(
          props.i18n._(t`The photo couldn't be taken.`),
          props.i18n._(t`You shut down the camera.`)
        );
      } else if (response.error) {
        Alert.alert(props.i18n._(t`ImagePicker Error:${response.error}`));
      } else {
        setPickedFile({
          name: response.fileName,
          uri: response.uri,
          type: response.type,
          size: Number(response.fileSize)
        });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  useEffect(() => {
    if (isEditing) {
      setPickedFile(initialPickedFileState);
    }
  }, [pickedFile]);

  const pickDocument = async () => {
    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        // error
        // console.log('error:', error);

        // No file picked
        if (!res) {
          Alert.alert(
            props.i18n._(t`Invalid file`),
            props.i18n._(t`Please select a file.`),
            [{text: 'Okay', style: 'destructive'}]
          );
          return;
        }

        // Android
        setPickedFile({
          name: res.fileName,
          uri: res.uri,
          type: res.type,
          size: Number(res.fileSize)
        });
        setFilePickerButtonText(props.i18n._(t`Select different file`));
      }
    );
  };

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {pickedFile.name && (formType === FILE || formType === PHOTO) ? (
          <View style={styles.imageWrap}>
            <Image
              source={{uri: pickedFile.uri}}
              style={styles.image}
              accessibilityLabel={props.i18n._(t`image preview`)}
            />
          </View>
        ) : null}
        {formType === FILE && (
          <View>
            <OutlineButton
              title={t`${filePickerButtonText}`}
              onPress={() => pickDocument()}
              style={null}
            />
          </View>
        )}
        {formType === PHOTO && (
          <TouchableOpacity
            onPress={() => takePhoto()}
            accessibilityRole="button">
            <Text style={[buttons.lg, outlineButtonStyles.buttons]}>
              <FontAwesome5 name="camera" size={20} />
              &nbsp; {pickedFile.uri === '' && <Trans>Take photo</Trans>}
              {pickedFile.uri && <Trans>Re-take photo</Trans>}
            </Text>
          </TouchableOpacity>
        )}
        {formType === AUDIO && (
          <View>
            <AddAudio setPickedFile={setPickedFile} isEditing={isEditing} />
          </View>
        )}
        <View>
          <UploadForm
            pickedFile={pickedFile}
            userFolders={props.userFolders}
            userTags={props.userTags}
            userBlogs={props.userBlogs}
            formType={formType}
            token={props.token}
            url={props.url}
            editItem={itemToEdit}
            navigation={props.navigation}
            defaultFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

AddItemScreen.navigationOptions = ({navigation}) => ({
  // Title is 'add' and 'edit' respectively, passed in from when you navigate to this page
  headerTitle: `${navigation.getParam('title')} ${navigation.getParam(
    'formType'
  )}`,
  headerLeft: null
});

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userTags: selectUserTags(state),
  userFolders: selectUserFolders(state),
  userBlogs: selectUserBlogs(state),
  uploadJournals: selectAllJEntries(state),
  uploadFiles: selectAllUploadFiles(state),
  defaultFolderTitle: selectDefaultFolderTitle(state),
  defaultBlogId: selectDefaultBlogId(state)
});

export default connect(mapStateToProps)(withI18n()(AddItemScreen));
