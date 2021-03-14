import React from 'react';
import Chip from './UI/Chip';

interface Props {
  name: string;
  isMainTech?: boolean;
}

const TechnologyBadge = ({ name, isMainTech = false }: Props) => {
  return (
    <Chip
      label={name}
      color="primary"
      variant={isMainTech ? 'default' : 'outlined'}
      size="small"
    />
  );
};

export default TechnologyBadge;
