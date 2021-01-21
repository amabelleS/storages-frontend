import React, { useEffect } from 'react';

import UserItem from '../components/UserItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import './user.css';

export const UserItemsList = (props) => {
  useEffect(() => {
    console.log(props.items.length);
  }, []);

  //   if (!props.items || props.items.length === 0) {
  //     return (
  //       <div className="user-list center">
  //         <Card>
  //           <h2>No items found</h2>
  //           {/* <Button to={`/${props.storageId}`}>Back to last storage</Button> */}
  //           <Button inverse to="/">
  //             Back to all storages
  //           </Button>
  //         </Card>
  //       </div>
  //     );
  //   }

  return (
    <ul className="users-list">
      {props.items.map((item, index) => (
        <UserItem
          key={index}
          id={item._id}
          img={item.image}
          name={item.name}
          depositAmount={item.depositAmount}
          description={item.description}
          rentCost={item.rentCost}
          item={{ ...item }}
          creator={item.creator}
        />
      ))}
    </ul>
  );
};

export default UserItemsList;
