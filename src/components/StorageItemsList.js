import React from 'react';

import ItemDetails from './ItemDetails';
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';

const StorageItemsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="storage-list center">
        <Card>
          <h2>No items found</h2>
          <div className="space-small_screan">
            <Button to={`/${props.storageId}`}>To storage</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ul className="items-list">
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
          image={item.image.url}
          storageId={props.storageId}
          adminId={props.adminId}
        />
      ))}
    </ul>
  );
};

export default StorageItemsList;
