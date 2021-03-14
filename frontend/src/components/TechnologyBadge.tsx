import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  name: string;
  isMainTech?: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 2,
  },
}));

const TechnologyBadge = ({ name, isMainTech = false }: Props) => {
  const classes = useStyles();

  return (
    <Chip
      className={classes.root}
      label={name}
      color="primary"
      variant={isMainTech ? 'default' : 'outlined'}
      size="small"
    />
  );
};

export default TechnologyBadge;
