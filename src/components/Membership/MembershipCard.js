import React from 'react';
import { Typography, Button, Card, CardContent, Divider } from '@mui/material';
import MembershipModal from './MembershipModal';
import './MembershipCard.scss';

const MembershipList = ({ membership, showModal, closeModal }) => {
  return (
    <Card className="membership-card">
      <CardContent className="card-content">
        <div className="header">
          <Typography variant="p" component="div" className="membership-type">
            {membership.type}
          </Typography>
        </div>

        <Divider variant="middle" className="divider" />

        <div className="price-section">
          <Typography variant="p" component="div" className="price">
            {'$' + membership.price + ' COP'}
          </Typography>

          <Typography variant="p" component="div" className="duration">
            {'Por año'}
          </Typography>
        </div>

        <Divider variant="middle" className="divider" />

        <div className="description-section">
          <Typography variant="p" component="div" className="description">
            {membership.description}
          </Typography>
        </div>

        <Divider variant="middle" className="divider" />

        <div className='addons'>
          {membership.addons && membership.addons.length > 0 && (
            <ul className="addons-list">
              {membership.addons.map((addon, index) => (
                <li key={index}>{addon}</li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
                
      <div className='subs-button'>
        <Button
          onClick={() => showModal(membership, closeModal)}
          variant="contained"
          color="primary"
          className="subscribe-button"
        >
          Suscribirse
        </Button>
      </div>
    </Card>
  );
};

export default MembershipList;
