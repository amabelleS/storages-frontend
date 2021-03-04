import React from 'react';
import { Link } from 'react-router-dom';
import Avater from '../shared/components/UIElements/Avatar';
import Card from '../shared/components/UIElements/Card';
import './StorageItem.css';

export const Storage = (props) => {
  return (
    <li className="storage-item">
      <Card className="storage-item__content">
        <Link to={`/${props.id}`}>
          <div className="info-items">
            <div className="storage-item__image">
              <Avater image={`${props.img}`} alt={props.title} />
            </div>
            <div className="scroll-container">
              {' '}
              <h4 className="scrollbar desc">{props.description}</h4>
            </div>

            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default Storage;
