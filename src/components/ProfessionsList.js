import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ProfessionsList = ({filtered}) => {
  return (
    <div style={{display: 'flex', width: '90%', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
      {filtered.slice(0, 100).map(job => {
        return(
          <Card sx={{ width: 800, height: 'max-content', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 5}} key={job.id}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {job.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {job.area?.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {job.employer?.name}
              </Typography>
              <div>
                {job.specializations && job.specializations.map(spec => <Typography variant="body2" color="text.secondary">{spec.name},</Typography>)}
              </div>
            </CardContent>
            <CardActions>
              <Button size="small">Посмотреть вакансию</Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  );
};

export default ProfessionsList;