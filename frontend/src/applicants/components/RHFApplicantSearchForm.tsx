import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { availableCities } from '../utils';

interface Props {
  error: string;
  loading: boolean;
  onSubmit: () => void;
}

interface FormInput {
  city: string;
  technology: string;
  minExperience: number;
  maxExperience: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing(90),
    padding: theme.spacing(2),
  },
  form: {
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    alignItems: 'baseline',
  },
  cityField: {
    gridColumn: 'span 2',
  },
  experienceField: {
    gridColumn: 'span 5',
  },
  icon: {
    marginBottom: theme.spacing(0.5),
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  submitButton: {
    gridColumn: 'span 5',
    marginLeft: 'auto',
  },
  technologyField: {
    gridColumn: 'span 3',
  },
}));

const RHFApplicantSearchForm = ({ error, loading, onSubmit }: Props) => {
  const classes = useStyles();

  const intl = useIntl();

  const methods = useFormContext<FormInput>();
  const { control, errors, register, watch, setValue } = methods;

  register('minExperience');
  register('maxExperience');
  const minExperience = watch('minExperience');
  const maxExperience = watch('maxExperience');

  return (
    <Card className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          className={classes.cityField}
          as={
            <Select
              fullWidth
              displayEmpty
              disableUnderline={true}
              startAdornment={
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon
                    color="primary"
                    className={classes.icon}
                  />
                </InputAdornment>
              }
              classes={{ select: classes.select }}
            >
              <MenuItem value="">
                <FormattedMessage id="cityField" />
              </MenuItem>
              {availableCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          }
        />
        <Controller
          name="technology"
          control={control}
          defaultValue=""
          className={classes.technologyField}
          rules={{ required: true }}
          as={
            <TextField
              fullWidth
              label={intl.formatMessage({ id: 'technologyField' })}
              placeholder={intl.formatMessage({ id: 'technologyPlaceholder' })}
              margin="none"
              InputProps={{
                disableUnderline: true,
              }}
              error={Boolean(errors['technology'])}
              helperText={
                errors['technology']
                  ? intl.formatMessage({ id: 'requiredField' })
                  : ''
              }
            />
          }
        />
        <Box className={classes.experienceField} mt={1}>
          <Typography variant="body1" color="primary">
            <FormattedMessage id="experienceField" />:
          </Typography>
          <Box mx={1} mt={5}>
            <Slider
              value={[minExperience, maxExperience]}
              valueLabelDisplay="on"
              min={0}
              max={12}
              marks={[
                { value: 0, label: '0' },
                { value: 12, label: '12+' },
              ]}
              valueLabelFormat={(value) =>
                value === 12 ? '12+' : value.toString()
              }
              onChange={(_, value) => {
                setValue('minExperience', (value as number[])[0]);
                setValue('maxExperience', (value as number[])[1]);
              }}
            />
          </Box>
        </Box>
        <Box className={classes.submitButton}>
          <IconButton type="submit">
            <SearchIcon color="primary" />
          </IconButton>
        </Box>
      </form>
    </Card>
  );
};

export default RHFApplicantSearchForm;
