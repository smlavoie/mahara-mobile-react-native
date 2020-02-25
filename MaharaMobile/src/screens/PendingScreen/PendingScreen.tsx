import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {removeUploadFile, removeUploadJEntry} from '../../actions/actions';
import styles from '../../assets/styles/variables';
import PendingList from '../../components/PendingList/PendingList';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import SubHeading from '../../components/UI/SubHeading/SubHeading';
import {
  DisplayItems,
  MaharaPendingFile,
  PendingJournalEntry,
  UploadResponse
} from '../../models/models';
import {selectUrl, selectUserName} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {
  selectAllUploadFiles,
  selectAllUploadFilesIds
} from '../../reducers/uploadFilesReducer';
import {
  selectAllJEntries,
  selectAllJEntriesIds
} from '../../reducers/uploadJEntriesReducer';
import {GUEST_USERNAME} from '../../utils/constants';
import {
  isPendingJournalEntry,
  uploadItemToMahara,
  usePreviousProps
} from '../../utils/helperFunctions';
import pendingScreenStyles from './PendingScreen.style';

type Props = {
  uploadFiles: Array<MaharaPendingFile>;
  uploadJEntries: Array<PendingJournalEntry>;
  uploadFilesIds: Array<string>;
  uploadJEntriesIds: Array<string>;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userName: string;
};

const PendingScreen = (props: Props) => {
  const uploadItemsCount =
    props.uploadFiles.length + props.uploadJEntries.length;
  const prevUploadCount = usePreviousProps(uploadItemsCount) || 0;
  const [
    successfullyUploadedItemsIds,
    setSuccessfullyUploadedItemsIds
  ] = useState<string[]>([]);
  const [uploadErrorItemsIds, setUploadErrorItemsIds] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const url = useSelector((state: RootState) => selectUrl(state));

  useEffect(() => {
    if (prevUploadCount < uploadItemsCount && uploadItemsCount !== 0) {
      setShowSuccessMessage(true);
    }
  }, [uploadItemsCount]);

  /**
   * When 'Remove' is pressed, filter out the item with the given id and update the UploadList.
   */
  const onRemove = (itemId: string) => {
    Alert.alert(
      'Are you sure?',
      'You will not be able to retrieve this information once removed',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => {
            props.dispatch(removeUploadFile(itemId));
            props.dispatch(removeUploadJEntry(itemId));
          }
        }
      ],
      {cancelable: false}
    );
  };

  const onEdit = (item: MaharaPendingFile | PendingJournalEntry) => {
    const type = isPendingJournalEntry(item) ? 'journal entry' : item.type;
    props.navigation.navigate({
      routeName: 'AddItem',
      params: {itemToEdit: item, formType: type, title: 'Edit'}
    });
  };

  const clearUploadError = (id: string) => {
    const newState = uploadErrorItemsIds.filter(item => item !== id);
    setUploadErrorItemsIds(newState);
  };

  const onUploadError = (id: string) => {
    setUploadErrorItemsIds([...uploadErrorItemsIds, id]);
  };

  /**
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  const renderPendingList = (dataList: DisplayItems) => {
    return (
      <PendingList
        dataList={dataList}
        onRemove={onRemove}
        onEdit={onEdit}
        navigation={props.navigation}
        successfullyUploadedItemsIds={successfullyUploadedItemsIds}
        uploadErrorItems={uploadErrorItemsIds}
        onClearError={clearUploadError}
      />
    );
  };

  const pendingDisplay = () => {
    let list: DisplayItems = [];

    if (props.uploadFilesIds?.length > 0) list = list.concat(props.uploadFiles);
    if (props.uploadJEntriesIds?.length > 0) {
      list = list.concat(props.uploadJEntries);
    }

    if (uploadItemsCount > 0) {
      return <View>{renderPendingList(list)}</View>;
    }
    return <Text>No pending uploads</Text>;
  };

  const onSuccessfulUpload = (id: string) => {
    // change class to show upload success
    setSuccessfullyUploadedItemsIds([...successfullyUploadedItemsIds, id]);
    // then, card disappears
    // and remove id from successfullyUploadedItems to clear memory
    setTimeout(() => {
      props.dispatch(removeUploadFile(id));
      props.dispatch(removeUploadJEntry(id));

      const newState = successfullyUploadedItemsIds.filter(item => item !== id);
      setSuccessfullyUploadedItemsIds(newState);
    }, 1000);
  };

  const onUploadClick = () => {
    props.uploadFiles.forEach(async file => {
      clearUploadError(file.id);
      props
        .dispatch(uploadItemToMahara(file.url, file.maharaFormData))
        .then((result: UploadResponse) => {
          // an error either returns result = undefined, or result = { error: true }
          if (result === undefined || result.error) {
            onUploadError(file.id);
          } else onSuccessfulUpload(file.id);
        });
    });

    props.uploadJEntries.forEach(async journalEntry => {
      clearUploadError(journalEntry.id);
      props
        .dispatch(
          uploadItemToMahara(journalEntry.url, journalEntry.journalEntry)
        )
        .then((result: UploadResponse) => {
          if (result === undefined || result.error) {
            onUploadError(journalEntry.id);
          } else onSuccessfulUpload(journalEntry.id);
        });
    });
  };

  return (
    <View style={pendingScreenStyles.app}>
      {showSuccessMessage && (
        <View>
          <Text>
            <Trans>Upload added to Pending List!</Trans>
          </Text>
          <Icon
            onPress={() => setShowSuccessMessage(false)}
            accessibilityLabel={i18n._(t`Close success message`)}
            name="times"
            type="font-awesome"
            color={styles.colors.dark}
          />
        </View>
      )}
      <View style={pendingScreenStyles.listContainer}>{pendingDisplay()}</View>
      <View style={pendingScreenStyles.buttonContainer}>
        {props.userName !== GUEST_USERNAME ? (
          <View>
            <SubHeading style={styles.padding.md}>{`URL: ${url}`}</SubHeading>
            <MediumButton
              title={t`Upload to your Mahara`}
              onPress={onUploadClick}
            />
          </View>
        ) : (
          <MediumButton
            title={t`Please login`}
            accessibilityHint={t`To upload pending items`}
            onPress={() => props.navigation.navigate('Auth')}
          />
        )}
      </View>
    </View>
  );
};

PendingScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerLeft: <HeaderMenuButton />
});

const mapStateToProps = (state: RootState) => ({
  uploadFiles: selectAllUploadFiles(state),
  uploadFilesIds: selectAllUploadFilesIds(state),
  uploadJEntries: selectAllJEntries(state),
  uploadJEntriesIds: selectAllJEntriesIds(state),
  userName: selectUserName(state)
});

export default connect(mapStateToProps)(PendingScreen);
