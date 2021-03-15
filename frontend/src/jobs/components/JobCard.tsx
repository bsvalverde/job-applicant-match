import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
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
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "city"
      "experience"
      "technologies"
      "button"
    `,
    gap: `${theme.spacing(1)}px`,
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        "city experience"
        "technologies technologies"
        "button button"
      `,
    },
  },
  button: {
    gridArea: 'button',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    margin: `${-theme.spacing(1)}px 0 0 ${-theme.spacing(1)}px`,
    '& > *': {
      margin: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
    },
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
        <Box
          className={classes.technologiesArea}
          display="flex"
          flexWrap="wrap"
        >
          {orderedTechnologies.map((technology, index) => (
            <TechnologyBadge key={index} name={technology} />
          ))}
        </Box>
      )}
      <Box className={classes.button} ml="auto">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default JobCard;
