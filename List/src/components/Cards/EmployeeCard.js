/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors, { lightColors } from '../../config/Colors';
import AvatarImage from '../AvatarImage';

const EmployeeCard = ({ item }) => {
  
  return (
    <View style={styles.content}>        
        <View style={styles.leftContent}>
          <AvatarImage source={item.image} />            
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.title}>{`${item.first_name} ${item.last_name}`}</Text>
          <Text style={styles.subtitle}>{item.position}</Text>
        </View>
      </View>     
  );  
};

export default EmployeeCard;

export const styles = StyleSheet.create({
  content: {    
    flexDirection: 'row',
    backgroundColor: lightColors.light1,
    borderColor: Colors.lightBorder,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: 2,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
  },
  leftContent: {
    width: '30%',
  },
  title: {    
    color: Colors.contentHeader,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {    
    color: Colors.headerSubtitle,
  },
  rightContent: {
    alignItems: 'flex-start',
    width: '70%',
    paddingLeft: 5,
    paddingTop: 5
  }
});