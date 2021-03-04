import React from 'react';
import './StorageList.css';
import StorageItem from './StorageItem';
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';

export const StorageList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="storage-list center">
        <Card>
          <h2>No storages found</h2>
          <Button to="/storages/new">Add new storage</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="storages-list">
      {props.items.map((storage) => (
        <StorageItem
          key={storage.id}
          id={storage.id}
          img={storage.image.url}
          title={storage.title}
          description={storage.description}
          address={storage.address}
          storage={{ ...storage }}
          creator={storage.creator}
        />
      ))}
    </ul>
  );
};

export default StorageList;
