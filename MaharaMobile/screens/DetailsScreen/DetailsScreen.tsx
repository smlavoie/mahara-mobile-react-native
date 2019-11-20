import React, { Component } from 'react';
import { styles } from '../../assets/styles/variables';
import { View, Text } from 'react-native';
import { Store } from 'redux';
import { connect, useSelector } from 'react-redux';
import { MaharaStore, MaharaPendingFile } from '../../models/models';

const DetailsScreen = (props: any) => {
    const uploadList = useSelector((state: MaharaStore) => state.app.uploadList);
    const fileId = props.navigation.getParam('fileId');

    const selectedFile = uploadList.find(
        (file: MaharaPendingFile) => file.id === fileId
    );;

    return (
        <View style={styles.screen}>
            <View style={styles.heading} >
                <Text style={styles.titleContainer}> Filename: </Text>
                <Text style={styles.title}> {(selectedFile: MaharaPendingFile) => { selectedFile.maharaFormData.title }} </Text>

            </View>
        </View>


    );



}

// export default connect(mapStateToProps)(DetailsScreen);
export default DetailsScreen;