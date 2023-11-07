import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';

export default function ActionAreaCard(props) {
  const { image, title, description, description2, content, link} = props;

  return (
    <Card sx={{ maxWidth: "400px", minHeight: "600px", borderRadius:15 }} >
      <CardActionArea component="a" href={link} target='_blank'>
        <CardMedia
          component="img"
          style={{height:"300px", objectFit:'contain'}}
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            {title}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary"  style={{height:"30px",display:"flex", justifyContent:"center", alignItems:"center"}}>
            {description}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary"  style={{height:"30px", display:"flex", justifyContent:"center", alignItems:"center"}}>
            {description2}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary"  style={{display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center", marginTop:"10px"}}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
