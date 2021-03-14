import UIChip, { ChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 2,
  },
}));

const Chip = ({ className, ...rest }: ChipProps) => {
  const classes = useStyles();

  return <UIChip className={clsx(classes.root, className)} {...rest} />;
};

export default Chip;
