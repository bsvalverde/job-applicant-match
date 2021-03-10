import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Candidate from '../../types/Candidate';
import TechnologyBadge from './TechnologyBadge';

interface Props {
  candidate: Candidate;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateAreas: `
      "city experience"
      "technologies technologies"
    `,
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

const CandidateCard = ({ candidate }: Props) => {
  const classes = useStyles();

  const { city, experience, technologies } = candidate;

  let orderedTechnologies = technologies.sort((a, b) => {
    if (a.isMainTech !== b.isMainTech) {
      return (b.isMainTech ? 1 : 0) - (a.isMainTech ? 1 : 0);
    }
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return (
    <Card className={classes.root}>
      <div className={classes.city}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="city" />
        </Typography>
        <Typography>{city}</Typography>
      </div>
      <div className={classes.experience}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="experience" />
        </Typography>
        <Typography>{experience}</Typography> {/** TODO fix display */}
      </div>
      <div className={classes.technologies}>
        {orderedTechnologies.map(({ name, isMainTech }) => (
          <TechnologyBadge name={name} isMainTech={isMainTech} />
        ))}
      </div>
    </Card>
  );
};

export default CandidateCard;