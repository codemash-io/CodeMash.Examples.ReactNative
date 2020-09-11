import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import LoadingIndicator from '../LoadingIndicator';

const SimpleList = ({ source, title, renderItem, idField, loadMoreData, noMoreResults, isLoading, contentContainerStyle,
  onRefresh, isRefreshing,
}) => {
  
  const renderFooter = () => {
    // when you scroll down and there is no data anymore.  
    if (noMoreResults) {
      return (
        <View></View>
      );
    }

    // otherwise show loading indicator on footer when fetching extra data
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <LoadingIndicator />
        ) : null}
      </View>
    );
  };

  return (
    <View style={{ minHeight: '100%' }}>
      <FlatList
        render
        contentContainerStyle={contentContainerStyle}
        data={source}
        keyExtractor={(item) => idField ? item[idField] : item._id}
        renderItem={renderItem}
        onEndReached={() => { if (loadMoreData) loadMoreData(); }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={ onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> : undefined }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default SimpleList;
