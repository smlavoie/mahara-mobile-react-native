import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {DisplayItems} from '../../models/models';
import UploadItem from '../UploadItem/UploadItem';

type Props = {
  dataList: DisplayItems;
  onRemove: Function;
  onEdit: Function;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  successfullyUploadedItemsIds: Array<string>;
  uploadErrorItems: Array<string>;
  onClearError: Function;
};

const PendingList = (props: Props) => {
  let title = '';
  let description = '';
  let thumbnail = {};
  let isSuccessfullyUploadedItem = false;
  let showUploadError = false;

  return (
    <FlatList
      data={props.dataList}
      renderItem={({item, index}: any) => {
        const itemId = item.id;
        let mimetype = '';
        //  figure out what to pass in to UploadItem
        if (item.maharaFormData !== undefined) {
          title = item.maharaFormData.title;
          description = item.maharaFormData.description;
          mimetype = item.mimetype;
          thumbnail = {
            uri: item.maharaFormData.filetoupload.uri
              ? item.maharaFormData.filetoupload.uri
              : ''
          };
        } else if (item.journalEntry !== undefined) {
          title = item.journalEntry.title;
          description = item.journalEntry.body;
          mimetype = 'journalEntry';
        }

        if (props.successfullyUploadedItemsIds.indexOf(itemId) !== -1) {
          isSuccessfullyUploadedItem = true;
        }
        props.uploadErrorItems.indexOf(itemId) !== -1
          ? (showUploadError = true)
          : (showUploadError = false);

        return (
          <UploadItem
            title={title}
            description={description}
            mimetype={mimetype}
            onRemove={() => props.onRemove(itemId)}
            onEdit={() => props.onEdit(item)}
            image={thumbnail}
            successfullyUploadedItem={isSuccessfullyUploadedItem}
            showUploadError={showUploadError}
            onClearError={() => props.onClearError(itemId)}
            index={index}
          />
        );
      }}
    />
  );
};

export default PendingList;
