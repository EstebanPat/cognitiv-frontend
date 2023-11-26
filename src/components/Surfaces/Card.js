import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';

export default function ActionAreaCard(props) {
  const { image, title, description, description2, content, link} = props;

  return (
    <Card sx={{ maxWidth: "100%", height: "80%", borderRadius:7, display: 'flex', flexDirection: 'column' }} >
      <CardActionArea component="a" href={link} target='_blank' style={{ flex: 1 }}>
        <CardMedia
          component="img"
          style={{ maxHeight: "40%", objectFit: 'contain', width: '100%' }}
          image={image}
          alt={title}
        />
        <CardContent style={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
            {title}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px" }}>
            {description}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" style={{ textAlign: "center", marginTop: "5px", marginBottom: "5px" }}>
            {description2}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" style={{ textAlign: "center", marginTop: "10px" }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
