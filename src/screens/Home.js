import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NativeModules, SafeAreaView} from 'react-native';

const {BatterySaverModule} = NativeModules;

import {Card, Button, Title, Paragraph} from 'react-native-paper';

const Home = () => {
  const [batterySaverEnabled, setBatterySaverEnabled] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    BatterySaverModule.isBatterySaverModeEnabled()
      .then(isBatterySaverMode => {
        console.log('try block ', isBatterySaverMode);

        setBatterySaverEnabled(isBatterySaverMode);
      })
      .catch(err => {
        console.log('catch block ', err);

        setError(err);
      });

    return () => {};
  }, []);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Title>Battery optimisation status </Title>
      </Card.Content>

      <Card.Content>
        {batterySaverEnabled !== null ? (
          <Paragraph>
            Battery saver mode is{' '}
            {batterySaverEnabled ? (
              <Text style={styles.txt}>Enabled</Text>
            ) : (
              <Text style={styles.txt}>Disabled</Text>
            )}
          </Paragraph>
        ) : (
          <Paragraph>Loading...</Paragraph>
        )}

        {batterySaverEnabled !== null ? (
          <Paragraph>
            {batterySaverEnabled ? null : (
              <Text style={styles.txt}>
                Please turn on the battery saver in your device ...{' '}
              </Text>
            )}
          </Paragraph>
        ) : (
          <Paragraph>Loading...</Paragraph>
        )}

        {error && <Paragraph>Error: {error.message}</Paragraph>}
      </Card.Content>
      <Card.Actions></Card.Actions>
    </Card>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 37,
  },
  txt: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },
});
