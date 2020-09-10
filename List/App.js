import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { config } from 'codemash';
import EmployeesScreen from './src/screens/Employees.js';

export default function App() {

  useEffect(() => {
    // CodeMash initialization
    config.init({
      secretKey: 'QOvCjN5G1kJ2sAWHclzdAEwi_3GqjRZu',
      projectId: 'c7e12daf-5dd2-4f42-b09f-6adf91075d4c'
    }, process.env.NODE_ENV);
  }, []);

  return (
    <View style={styles.container}>
      <EmployeesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
