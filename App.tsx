import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import WWDCInvite from './components/WWDCInvite';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <WWDCInvite />
    </SafeAreaView>
  );
}
