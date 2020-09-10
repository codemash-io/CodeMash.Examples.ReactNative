import React from 'react';
import { TouchableOpacity } from 'react-native';
import SimpleList from '../components/Lists/SimpleList';
import useFind from '../hooks/useFind';
import LoadingIndicator from '../components/LoadingIndicator';
import EmployeeCard from '../components/Cards/EmployeeCard';
import EmptyScreen from '../components/Blocks/EmptyScreen';
import { PROJECT_CONFIG } from '../config/ProjectConfig';

const EmployeesScreen = () => {
  
  const [find, result, isLoading, , noMoreResults, isRefreshing] = useFind({
    collectionName: 'employees',
    pageSize: 5    
  });  

  if (isLoading === PROJECT_CONFIG.LOADING_INDICATOR.INITIAL_LOAD) {
    return <LoadingIndicator />;    
  }

  const goToDetails = (item) => {
    alert('go to details page');
  };

  return (
    <>
      {/* When no results, show nice image that there is no data */}
      {(!result || result.length === 0) && (
        <EmptyScreen
          message="No employees found"
          onRefresh={() => find(true)}
          isRefreshing={isRefreshing}
        />
      )}
      {/* Render data  */}
      {result && result.length > 0 && (
        <SimpleList
          source={result}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToDetails(item)}>
              <EmployeeCard
                item={item}
              />
            </TouchableOpacity>
          )}
          loadMoreData={find}
          noMoreResults={noMoreResults}
          isLoading={isLoading === PROJECT_CONFIG.LOADING_INDICATOR.PAGING}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
          onRefresh={() => find(true)}
          isRefreshing={isRefreshing}
        />
      )}
    </>
  );
};

export default EmployeesScreen;
