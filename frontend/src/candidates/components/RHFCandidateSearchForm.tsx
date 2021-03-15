import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import MultiSelect from '../../components/UI/MultiSelect';
import { availableCities, availableTechnologies } from '../utils';

interface Props {
  error: string;
  loading: boolean;
  onSubmit: () => void;
}

interface FormInput {
  city: string;
  technologies: string[];
  minExperience: number;
  maxExperience: number;
}

interface MultiSelectOption {
  value: string;
  label: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing(90),
    padding: theme.spacing(2),
    overflow: 'visible',
  },
  form: {
    display: 'grid',
    gridGap: theme.spacing(1),
    alignItems: 'baseline',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
  },
  cityField: {
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 2',
    },
  },
  experienceField: {
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 5',
    },
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
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 5',
    },
    marginLeft: 'auto',
  },
  technologyField: {
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 3',
    },
  },
}));

const RHFCandidateSearchForm = ({ error, loading, onSubmit }: Props) => {
  const classes = useStyles();

  const intl = useIntl();

  const methods = useFormContext<FormInput>();
  const { control, errors, register, watch, setValue } = methods;

  register('minExperience');
  register('maxExperience');
  const minExperience = watch('minExperience');
  const maxExperience = watch('maxExperience');

  const mapStringsToMultiSelectOptions = (strings: string[]) =>
    strings.map((string) => ({ value: string, label: string }));

  const mapMultiSelectOptionsToStrings = (options: MultiSelectOption[]) =>
    options.map((option) => option.value);

  return (
    <Card className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ value, onChange }) => (
            <Select
              className={classes.cityField}
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
              value={value}
              onChange={onChange}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                transformOrigin: { horizontal: 'center', vertical: 'top' },
                transitionDuration: 0,
                style: { maxHeight: 400 },
              }}
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
          )}
        />
        <Controller
          name="technologies"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <div className={classes.technologyField}>
              <MultiSelect
                options={mapStringsToMultiSelectOptions(availableTechnologies)}
                isMulti
                placeholder={intl.formatMessage({
                  id: 'technologyPlaceholder',
                })}
                value={mapStringsToMultiSelectOptions(value || [])}
                onChange={(options) => {
                  onChange(
                    mapMultiSelectOptionsToStrings(
                      options as MultiSelectOption[],
                    ),
                  );
                }}
              />
              {Boolean(errors['technologies']) && (
                <Typography color="error" variant="caption">
                  <FormattedMessage id="requiredField" />
                </Typography>
              )}
            </div>
          )}
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
          {loading ? (
            <CircularProgress color="primary" size={44} />
          ) : (
            <IconButton type="submit">
              <SearchIcon color="primary" />
            </IconButton>
          )}
        </Box>
      </form>
      {error && (
        <Typography color="error" variant="body2" align="center">
          <FormattedMessage id={error} />
        </Typography>
      )}
    </Card>
  );
};

export default RHFCandidateSearchForm;
