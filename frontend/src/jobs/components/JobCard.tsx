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
    gridArea: 'city',
  },
  experience: {
    gridArea: 'experience',
  },
  technologies: {
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
      <div className={classes.city}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="city" />
        </Typography>
        <Typography>
          {city}{' '}
          {isRemote && (
            <Chip
              label={<FormattedMessage id="remote" />}
              color="secondary"
              variant="outlined"
              size="small"
            />
          )}
        </Typography>
      </div>
      <div className={classes.experience}>
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
        <div className={classes.technologies}>
          {orderedTechnologies.map((technology, index) => (
            <TechnologyBadge key={index} name={technology} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default JobCard;
