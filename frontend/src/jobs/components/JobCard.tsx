import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import TechnologyBadge from '../../components/TechnologyBadge';
import Chip from '../../components/UI/Chip';
import Job from '../../types/jobs';

interface Props {
  job: Job;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateAreas: `
      "city experience"
      "technologies technologies"
    `,
    gridTemplateColumns: '1fr 1fr',
    gap: `${theme.spacing(1)}px`,
  },
  city: {
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  cityArea: {
    gridArea: 'city',
  },
  experienceArea: {
    gridArea: 'experience',
  },
  technologiesArea: {
    gridArea: 'technologies',
    display: 'flex',
    gap: `${theme.spacing(1)}px`,
    flexWrap: 'wrap',
  },
}));

const JobCard = ({ job }: Props) => {
  const classes = useStyles();

  const { city, isRemote, minExperience, maxExperience, technologies } = job;

  let orderedTechnologies = technologies.sort();

  return (
    <Card className={classes.root}>
      <div className={classes.cityArea}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="city" />
        </Typography>
        <div className={classes.city}>
          {city && <Typography component="span">{city}</Typography>}
          {isRemote && (
            <Chip
              label={<FormattedMessage id="remote" />}
              color="secondary"
              variant="outlined"
              size="small"
            />
          )}
        </div>
      </div>
      <div className={classes.experienceArea}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="experience" />
        </Typography>
        <Typography>
          <FormattedMessage
            id={'experienceRange'}
            values={{ minExperience, maxExperience }}
          />
        </Typography>
      </div>
      {Boolean(orderedTechnologies.length) && (
        <div className={classes.technologiesArea}>
          {orderedTechnologies.map((technology, index) => (
            <TechnologyBadge key={index} name={technology} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default JobCard;
