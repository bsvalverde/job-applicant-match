import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Candidate from '../../types/Candidate';
import CandidateCard from './CandidateCard';

interface Props {
  candidates: Candidate[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(90),
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CandidateList = ({ candidates }: Props) => {
  const classes = useStyles();

  let content;

  if (!candidates.length) {
    content = (
      <Card>
        <Box p={2}>
          <Typography align="center">
            <FormattedMessage id="noCandidatesToShow" />
          </Typography>
        </Box>
      </Card>
    );
  } else {
    content = candidates.map((candidate) => (
      <CandidateCard key={candidate.id} candidate={candidate} />
    ));
  }

  return (
    <Box width="100%" className={classes.root}>
      {content}
    </Box>
  );
};

export default CandidateList;
