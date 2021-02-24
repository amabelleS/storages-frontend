import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Context from '../context/storages/cotext';
import { AuthContext } from '../context/auth/Auth-context';

import { useHttpClient } from '../shared/hooks/http-hook';
import Modal from '../shared/components/UIElements/Modal';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import sampleOptions from '../components/charts/options';

import Button from '../shared/components/FormElements/Button';

import './Statistics.css';

const Statistics = () => {
  const auth = useContext(AuthContext);
  const { globalState, globalDispatch } = useContext(Context);
  const { storage } = globalState;
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [lineOptions, setLineOptions] = useState(sampleOptions);
  //   const [BarOptions, setBarOptions] = useState(sampleOptions);

  const history = useHistory();
  //   const { sid } = useParams();

  const [incomeMode, setMode] = useState(false);
  const graph = incomeMode ? <BarChart /> : <LineChart options={lineOptions} />;

  const onlyOotItems = storage.storageItems.filter((item) => item.out).length;

  //   const formatDate = (d) => {
  //     let formatedDate =
  //       d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ';
  //     // +
  //     // d.getHours() +
  //     // ':' +
  //     // d.getMinutes();

  //     return formatedDate;
  //   };

  //   const formatDate = (d)

  useEffect(() => {
    // let x = 0;

    const formatGraphData1 = storage.itemsDataPoints.map((log, index) => {
      //   const date = log.x.toLocaleDateString();
      // x += 10;
      let dataPoint = {
        x: index * 10,
        y: log.y1,
        label: log.x.slice(0, 10),
        // label: log.x.toISOString().slice(0, 10),
        // label: log.date,
      };
      // x = 0;
      //   console.log(log.x.toLocaleDateString());
      //   console.log(log.date);
      return dataPoint;
    });

    const formatGraphData2 = storage.itemsDataPoints.map((log, index) => {
      //   const date = log.x.toLocaleDateString();
      // x += 10;
      let dataPoint = {
        // x: log.x,
        x: index * 10,
        y: log.y2,
        label: log.x.slice(0, 10),
        // label: log.date,
      };

      return dataPoint;
    });

    const updatedOptions = { ...lineOptions };
    updatedOptions.data[0].dataPoints = formatGraphData1;
    updatedOptions.data[1].dataPoints = formatGraphData2;
    setLineOptions(updatedOptions);
  }, [setLineOptions]);

  // ADD NEW ITEMS NODE
  const showNewItemsNodeHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelAddItemsNodeHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmAddItemsNodeHandler = async () => {
    setShowConfirmModal(false);
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/storages/${storage.id}/addItemsNode`,
        'PATCH',
        JSON.stringify({
          x: Date.now(),
          y1: onlyOotItems,
          y2: storage.storageItems.length,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log(responseData.storage);

      globalDispatch({ type: 'set-storage', payload: responseData.storage });
      //   updateItem(item._id, responseData.item);

      history.push(`/${storage.id}/statistics`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelAddItemsNodeHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelAddItemsNodeHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmAddItemsNodeHandler}>
              ADD NODE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and add new node to Items Charts? Please note
          that it can't be undone thereafter.
        </p>
      </Modal>

      <div className="icons-plus-graph-container">
        <h2>{storage.title.toUpperCase()} CHARTS</h2>
        <div className="icons-container">
          <Button out onClick={() => setMode(!incomeMode)}>
            {incomeMode ? 'SHOW ITEMS COUNT' : 'SHOW INCOME'}
          </Button>

          {/* {!incomeMode && (
            <div className="button info-icon">
              <p>Out now: {storage && onlyOotItems}</p>
            </div>
          )} */}
          {!incomeMode && (
            <Button stat onClick={showNewItemsNodeHandler}>
              ADD NEW NODE
            </Button>
          )}
          {!incomeMode && (
            <React.Fragment>
              <div className="button info-icon">
                <p>
                  Total items :{' '}
                  {storage &&
                    storage.storageItems.length > 0 &&
                    storage.storageItems.length}
                </p>
              </div>
              <div className="button info-icon">
                <p>Out now: {storage && onlyOotItems}</p>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="graph-container">{graph}</div>
        {/* <div className="graph-container">
        <BarChart />
      </div> */}
      </div>
      <div className="button-container">
        <Button to={`/${storage.id}`}>TO STORAGE</Button>
        <Button inverse to={`/${storage.id}/items`}>
          TO STORAGE ITEMS
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Statistics;
