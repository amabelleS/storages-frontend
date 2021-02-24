import React from 'react';
import { Link } from 'react-router-dom';
import Avater from '../shared/components/UIElements/Avatar';
import Card from '../shared/components/UIElements/Card';
import './StorageItem.css';

export const Storage = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}`}>
          <div className="user-item__image">
            <Avater
              image={`${props.img}`}
              // image={props.img.url}
              alt={props.title}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default Storage;
