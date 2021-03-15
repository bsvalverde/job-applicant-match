import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Job from '../../types/jobs';
import JobCard from './JobCard';

interface Props {
  jobs: Job[];
  loading: boolean;
  error: string;
  onJobClick: (job: Job) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(90),
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  jobCard: {
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease-in',
    '&:hover': {
      boxShadow: `0 0 5px 3px ${theme.palette.primary.light}`,
    },
  },
}));

const JobList = ({ jobs, loading, error, onJobClick }: Props) => {
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
          <Typography align="center" color={error ? 'error' : 'initial'}>
            <FormattedMessage id={error || 'noJobsToShow'} />
          </Typography>
        </Box>
      </Card>
    );
  } else {
    content = jobs.map((job) => (
      <div
        key={job._id}
        className={classes.jobCard}
        onClick={() => onJobClick(job)}
      >
        <JobCard job={job} />
      </div>
    ));
  }

  return (
    <Box width="100%" className={classes.root}>
      {content}
    </Box>
  );
};

export default JobList;
