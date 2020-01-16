import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import pendingScreenStyles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { removeUploadFile, removeUploadJEntry } from '../../actions/actions'
import { MaharaPendingFile, PendingJournalEntry } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'
import PendingList from '../../components/PendingList/PendingList';
import { uploadItemToMahara } from '../../utils/helperFunctions';
import { RootState } from '../../reducers/reducers';
import { selectAllUploadFiles, selectAllUploadFilesIds } from '../../reducers/uploadFilesReducer';
import { selectAllJEntriesIds, selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
import HeaderMenuButton from '../../components/HeaderMenuButton/HeaderMenuButton';
import styles from '../../assets/styles/variables';
import { selectUserName } from '../../reducers/loginInfoReducer';

type Props = {
  uploadFiles: Array<MaharaPendingFile>;
  uploadJEntries: Array<PendingJournalEntry>;
  uploadFilesIds: Array<string>;
  uploadJEntriesIds: Array<string>;
  dispatch: any;
  navigation: any;
  userName: string;
}

type State = {
  uploadRequestPending: boolean;
  uploadRequestReceived: boolean;
  successMessage: string;
  uploadItemsExist: boolean;
}

export class PendingScreen extends Component<Props, State> {
  static navigationOptions = (navData) => ({
    headerStyle: {
      backgroundColor: styles.colors.primary
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center'
    },
    headerTintColor: '#fff',
    headerLeft: <HeaderMenuButton navData={navData} />,
    headerTitle: 'Pending items'
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      uploadRequestPending: false,
      uploadRequestReceived: false,
      successMessage: '',
      uploadItemsExist: (this.props.uploadFiles.length + this.props.uploadJEntries.length > 0 ? true : false),
    };
  }

  pendingDisplay = () => {
    const { uploadRequestPending, uploadRequestReceived, successMessage } = this.state
    let list: Array<any> = [];

    if (this.props.uploadFilesIds?.length > 0) list = list.concat(this.props.uploadFiles);
    if (this.props.uploadJEntriesIds?.length > 0) list = list.concat(this.props.uploadJEntries)

    if (this.state.uploadItemsExist) {
      return <View>{this.renderPendingList(list)}</View>;
    }
    if (uploadRequestPending) return <Spinner />;
    if (!uploadRequestPending && uploadRequestReceived) return <Text>{successMessage}</Text>;
    return <Text>No pending uploads</Text>;
  };

  /**
   * When 'Remove' is pressed, filter out the item with the given id and update the UploadList.
   */
  onRemove = (itemId: string) => {
    this.props.dispatch(removeUploadFile(itemId));
    this.props.dispatch(removeUploadJEntry(itemId));
  }

  onUploadClick = () => {
    try {
      this.props.uploadFiles.forEach(file => this.props.dispatch(uploadItemToMahara(file.url, file.maharaFormData)));
      this.props.uploadJEntries.forEach(journalEntry => this.props.dispatch(uploadItemToMahara(journalEntry.url, journalEntry.journalEntry)));
      this.props.uploadFiles.forEach(file => this.props.dispatch(removeUploadFile(file.id)))
      this.props.uploadJEntries.forEach(journalEntry => this.props.dispatch(removeUploadJEntry(journalEntry.id)))
    } catch (error) {
      console.log('onUploadClick error', error);
    }
  };

  /**
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  renderPendingList(dataList: Array<any>) {
    return (
      <PendingList
        dataList={dataList}
        onRemove={this.onRemove}
        onEdit={this.onEdit}
        navigation={this.props.navigation}
      />
    );
  }

  onEdit = (item: MaharaPendingFile | PendingJournalEntry) => {
    const type = item.type ? item.type : 'journal entry';
    this.props.navigation.navigate({routeName: 'AddFile', params: { item: item, formType: type }});
  }

  render() {
    return (
      <View style={pendingScreenStyles.app}>
        <View style={pendingScreenStyles.listContainer}>
          {this.pendingDisplay()}
        </View>
        <View style={pendingScreenStyles.buttonContainer}>
          {this.props.userName !== 'guest' ? (
            <TouchableOpacity onPress={this.onUploadClick}>
              <Text style={buttons.lg}>Upload to your Mahara</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Auth')}>
              <Text style={buttons.lg}>Please login</Text>
            </TouchableOpacity>)
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    uploadFiles: selectAllUploadFiles(state),
    uploadFilesIds: selectAllUploadFilesIds(state),
    uploadJEntries: selectAllJEntries(state),
    uploadJEntriesIds: selectAllJEntriesIds(state),
    userName: selectUserName(state)
  };
};

export default connect(mapStateToProps)(PendingScreen);
