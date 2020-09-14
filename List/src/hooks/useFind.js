/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { db } from 'codemash';
import { PROJECT_CONFIG } from '../config/ProjectConfig';

export default ({ collectionName, filter, pageSize, pageNumber, sort, projection, referencedFields }) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(PROJECT_CONFIG.DATA_LOADING.DO_NOT_LOAD); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [totalGot, setTotalGot] = useState(0);
  const [requestData, setRequestData] = useState({
    collectionName, filter, pageSize, pageNumber: pageNumber || 0, sort, projection, referencedFields,
  });

  const find = async (loadExtraData) => {
    // if we call find function for an extra data and it's still refreshing - return
    // or if we call find for the first time return when 
    //    no more data
    //    already loading data (initial load | extra load)
    if ((loadExtraData && isRefreshing) || (!loadExtraData && (noMoreResults || isLoading !== PROJECT_CONFIG.DATA_LOADING.DO_NOT_LOAD))) 
      return;
    try {
      if (loadExtraData) 
        setIsRefreshing(true);
      else 
        setIsLoading(totalGot === 0 
          ? PROJECT_CONFIG.DATA_LOADING.FIRST_TIME_LOAD 
          : PROJECT_CONFIG.DATA_LOADING.EXTRA_ROUNDTRIP);

      const response = await db.getRecords({
          collectionName: requestData.collectionName,
          pageNumber: loadExtraData ? 0 : requestData.pageNumber,
          pageSize: requestData.pageSize || PROJECT_CONFIG.DEFAULT_PAGE_SIZE,
          sort: requestData.sort,
          filter: requestData.filter,
          projection: requestData.projection,
          referencedFields: requestData.referencedFields,
          language: 'en',
        }
      );

      if (response && response.result) {
        let newTotalGot = 0;

        // apply new result to existing data and set new total value
        if (loadExtraData) {
          setResult([...response.result]);

          newTotalGot = response.result.length;
          setTotalGot(newTotalGot);
        } 
        // set result for the first time and set total
        else {
          setResult([...result, ...response.result]);

          newTotalGot = totalGot + response.result.length;
          setTotalGot(newTotalGot);
        }

        // when all data is gathered set indicator noMoreResults as true. 
        if (newTotalGot >= response.totalCount) {
          setNoMoreResults(true);
        } 
        // otherwise allow extra roundtrips to the server
        else {
          setNoMoreResults(false);
        }
      }
      // setNextPage(nextPage + 1);
      setRequestData((prevData) => ({ ...prevData, pageNumber: loadExtraData ? 1 : prevData.pageNumber + 1 }));
    } catch (e) {      
      setErrorMessage('Something went wrong');
    } finally {
      // disable refreshing and loading indicators.
      if (loadExtraData) 
        setIsRefreshing(false);
      else 
        setIsLoading(PROJECT_CONFIG.DATA_LOADING.DO_NOT_LOAD);
    }
  };

  useEffect(() => {
    find();
  }, []);

  return [find, result, isLoading, errorMessage, noMoreResults, isRefreshing];
};
