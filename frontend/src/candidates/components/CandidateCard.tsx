import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import TechnologyBadge from '../../components/TechnologyBadge';
import Candidate from '../../types/candidates';

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
    gridTemplateColumns: '1fr 1fr',
    gap: `${theme.spacing(1)}px`,
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

  const experienceValue =
    experience === 12 ? '12+' : `${experience}-${experience + 1}`;

  return (
    <Card className={classes.root}>
      <div className={classes.cityArea}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="city" />
        </Typography>
        <Typography>{city}</Typography>
      </div>
      <div className={classes.experienceArea}>
        <Typography variant="body2" color="primary">
          <FormattedMessage id="experience" />
        </Typography>
        <Typography>
          <FormattedMessage
            id={'experienceValue'}
            values={{ value: experience, stringValue: experienceValue }}
          />
        </Typography>
      </div>
      {Boolean(orderedTechnologies.length) && (
        <div className={classes.technologiesArea}>
          {orderedTechnologies.map(({ name, isMainTech }, index) => (
            <TechnologyBadge key={index} name={name} isMainTech={isMainTech} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CandidateCard;
