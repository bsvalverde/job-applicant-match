import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Job from '../../types/jobs';
import JobContainer from '../containers/JobContainer';

interface Props {
  jobs: Job[];
  loading: boolean;
  error: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(90),
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const JobList = ({ jobs, loading, error }: Props) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <CircularProgress />;
      </Box>
    );
  }

  let content;

  if (error || !jobs.length) {
    content = (
      <Card>
        <Box p={2}>
          <Typography align="center">
            <FormattedMessage id={error || 'noJobsToShow'} />
          </Typography>
        </Box>
      </Card>
    );
  } else {
    content = jobs.map((job) => <JobContainer key={job._id} job={job} />);
  }

  return (
    <Box width="100%" className={classes.root}>
      {content}
    </Box>
  );
};

export default JobList;
