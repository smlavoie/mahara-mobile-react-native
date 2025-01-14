import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { Input, Stack } from 'native-base';
import { ActivityIndicator, StyleSheet } from 'react-native';
import styles from 'assets/styles/variables';
import LogoView from 'components/LogoView/LogoView';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import SubHeading from 'components/UI/SubHeading/SubHeading';
// Images
import { LOG_IN_ICON } from 'utils/constants';

// Styles
// import styles from './TokenInput.style';

type Props = {
  onGetToken: (token: string) => void;
  isLoading: boolean;
};

const TokenLoginStyles = StyleSheet.create({
  input: {
    backgroundColor: styles.colors.light
  }
});

export default function TokenInput(props: Props) {
  const [token, setToken] = useState('');

  return (
    <LogoView>
      {props.isLoading ? <ActivityIndicator size="small" color={styles.colors.light} /> : null}

      <Stack direction="column" mb="2.5" mt="1.5" space={3}>
        <SubHeading
          noColon
          style={{ color: styles.colors.light, textAlign: 'center' }}
          text=" Log in via an access token"
        />
        <Input
          placeholder="..."
          autoCapitalize="none"
          onChangeText={(input) => setToken(input.trim())}
          style={TokenLoginStyles.input}
          variant="filled"
          w={{
            base: '100%',
            md: '25%'
          }}
        />
        <MediumButton
          text={t`Verify token`}
          icon={LOG_IN_ICON}
          onPress={() => props.onGetToken(token)}
        />
      </Stack>
    </LogoView>
  );
}
