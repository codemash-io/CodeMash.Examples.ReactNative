/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { db } from 'codemash';
import { PROJECT_CONFIG } from '../config/ProjectConfig';

export default ({ collectionName, filter, pageSize, pageNumber, sort, projection, referencedFields }) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(PROJECT_CONFIG.LOADING_INDICATOR.NO); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [totalGot, setTotalGot] = useState(0);
  const [requestData, setRequestData] = useState({
    collectionName, filter, pageSize, pageNumber: pageNumber || 0, sort, projection, referencedFields,
  });

  const find = async (refresh) => {
    if ((refresh && isRefreshing) || (!refresh && (noMoreResults || isLoading !== 0))) return;
    try {
      if (refresh) setIsRefreshing(true);
      else setIsLoading(totalGot === 0 ? 1 : 2);

      console.log(requestData)

      const response = await db.getRecords({
          collectionName: requestData.collectionName,
          pageNumber: refresh ? 0 : requestData.pageNumber,
          pageSize: requestData.pageSize || PROJECT_CONFIG.DEFAULT_PAGE_SIZE,
          sort: requestData.sort,
          filter: requestData.filter,
          projection: requestData.projection,
          referencedFields: requestData.referencedFields,
          language: 'en',
        }
      );

      console.log("response", response)

      if (response && response.result) {
        let newTotalGot = 0;

        if (refresh) {
          setResult([...response.result]);

          newTotalGot = response.result.length;
          setTotalGot(newTotalGot);
        } else {
          setResult([...result, ...response.result]);

          newTotalGot = totalGot + response.result.length;
          setTotalGot(newTotalGot);
        }

        if (newTotalGot >= response.totalCount) {
          setNoMoreResults(true);
        } else {
          setNoMoreResults(false);
        }
      }

      // setNextPage(nextPage + 1);
      setRequestData((prevData) => ({ ...prevData, pageNumber: refresh ? 1 : prevData.pageNumber + 1 }));
    } catch (e) {      
      setErrorMessage('Something went wrong');
    } finally {
      if (refresh) setIsRefreshing(false);
      else setIsLoading(0);
    }
  };

  useEffect(() => {
    find();
  }, []);

  return [find, result, isLoading, errorMessage, noMoreResults, isRefreshing];
};
