import React from 'react';
import './StorageItemsList.css';

import ItemDetails from './ItemDetails';
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';

const StorageItemsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No items found</h2>
          <Button to={`/${props.storageId}`}>Back to last storage</Button>
          <Button inverse to="/">
            Back to all storages
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((item) => (
        <ItemDetails
          key={item._id}
          id={item._id}
          //   img={storage.image}
          name={item.name}
          description={item.description}
          rentCost={item.rentCost}
          qntInStock={item.qntInStock}
          item={{ ...item }}
          image={item.image}
          storageId={props.storageId}
          adminId={props.adminId}

          //   reserved={props.reserved}
          //   creator={storage.creator}
        />
      ))}
    </ul>
  );
};

export default StorageItemsList;
