import Close from '@material-ui/icons/Close';
import * as classNames from 'classnames';
import * as React from 'react';
import Error from 'src/assets/icons/alert.svg?component';
import Check from 'src/assets/icons/check.svg?component';
import Flag from 'src/assets/icons/flag.svg?component';
import Warning from 'src/assets/icons/warning.svg?component';
import {
  makeStyles,
  Theme,
  withTheme,
  WithTheme,
} from 'src/components/core/styles';
import Typography, { TypographyProps } from 'src/components/core/Typography';
import Grid, { GridProps } from 'src/components/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  root: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    padding: '4px 16px',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    '& + .notice': {
      marginTop: `${theme.spacing(1)}px !important`,
    },
  },
  cmr: {
    borderRadius: 3,
    '& $important': {
      backgroundColor: theme.cmrBGColors.bgPaper,
    },
    '& $noticeText': {
      color: theme.cmrTextColors.headlineStatic,
    },
    '& $error': {
      borderLeftColor: theme.cmrIconColors.iRed,
    },
  },
  important: {
    backgroundColor: theme.cmrBGColors.bgPaper,
    padding: theme.spacing(2),
    '& $noticeText': {
      fontFamily: theme.font.normal,
    },
  },
  icon: {
    color: 'white',
    position: 'absolute',
    left: -25, // This value must be static regardless of theme selection
  },
  closeIcon: {
    paddingLeft: theme.spacing(1),
  },
  inner: {
    width: '100%',
  },
  breakWords: {
    '& $noticeText': {
      wordBreak: 'break-all',
    },
  },
  noticeText: {
    color: theme.palette.text.primary,
    fontSize: '1rem',
    lineHeight: `20px`,
    fontFamily: 'Lato', // we keep this bold at all times
    '& p': {
      fontSize: '1rem',
    },
  },
  error: {
    borderLeft: `5px solid ${theme.palette.status.errorDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32,
    },
  },
  errorList: {
    borderLeft: `5px solid ${theme.palette.status.errorDark}`,
  },
  warning: {
    borderLeft: `5px solid ${theme.palette.status.warningDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32,
    },
    '& $icon': {
      color: '#555',
    },
  },
  warningList: {
    borderLeft: `5px solid ${theme.palette.status.warningDark}`,
  },
  success: {
    borderLeft: `5px solid ${theme.palette.status.successDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32,
    },
  },
  successList: {
    borderLeft: `5px solid ${theme.palette.status.successDark}`,
  },
  flag: {
    marginRight: theme.spacing(2),
  },
}));

interface Props extends GridProps {
  text?: string;
  error?: boolean;
  errorGroup?: string;
  important?: boolean;
  warning?: boolean;
  success?: boolean;
  typeProps?: TypographyProps;
  className?: string;
  flag?: boolean;
  notificationList?: boolean;
  spacingTop?: 0 | 8 | 16 | 24;
  spacingBottom?: 0 | 8 | 16 | 24;
  breakWords?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // Dismissible Props
  dismissible?: boolean;
  onClose?: () => void;
}

type CombinedProps = Props & WithTheme;

const Notice: React.FC<CombinedProps> = (props) => {
  const {
    className,
    important,
    text,
    dismissible,
    error,
    breakWords,
    errorGroup,
    warning,
    success,
    typeProps,
    children,
    flag,
    notificationList,
    onClick,
    onClose,
    spacingTop,
    spacingBottom,
  } = props;

  const classes = useStyles();

  const innerText = text ? (
    <Typography
      {...typeProps}
      onClick={onClick}
      className={`${classes.noticeText} noticeText`}
    >
      {text}
    </Typography>
  ) : null;

  /**
   * There are some cases where the message
   * can be either a string or JSX. In those
   * cases we should use props.children, but
   * we want to make sure the string is wrapped
   * in Typography and formatted as it would be
   * if it were passed as props.text.
   */
  const _children =
    typeof children === 'string' ? (
      <Typography className={`${classes.noticeText} noticeText`}>
        {children}
      </Typography>
    ) : (
      children
    );

  const errorScrollClassName = errorGroup
    ? `error-for-scroll-${errorGroup}`
    : `error-for-scroll`;

  const dataAttributes = !props.error
    ? {
        'data-qa-notice': true,
      }
    : {
        'data-qa-notice': true,
        'data-qa-error': true,
      };

  return (
    <Grid
      item
      className={classNames({
        [classes.root]: true,
        [classes.important]: important,
        [errorScrollClassName]: error,
        [classes.breakWords]: breakWords,
        [classes.error]: error && !notificationList,
        [classes.errorList]: error && notificationList,
        [classes.success]: success && !notificationList,
        [classes.successList]: success && notificationList,
        [classes.warning]: warning && !notificationList,
        [classes.warningList]: warning && notificationList,
        [classes.cmr]: true,
        notice: true,
        ...(className && { [className]: true }),
      })}
      style={{
        marginTop: spacingTop !== undefined ? spacingTop : 0,
        marginBottom: spacingBottom !== undefined ? spacingBottom : 24,
      }}
      {...dataAttributes}
      role="alert"
    >
      {flag && (
        <Grid item>
          <Flag className={classes.flag} />
        </Grid>
      )}
      {important &&
        ((success && <Check className={classes.icon} data-qa-success-img />) ||
          (warning && (
            <Warning className={classes.icon} data-qa-warning-img />
          )) ||
          (error && <Error className={classes.icon} data-qa-error-img />))}
      <div className={classes.inner}>{innerText || _children}</div>
      {dismissible && (
        <Grid item className={classes.closeIcon}>
          <Close
            style={{
              cursor: 'pointer',
            }}
            onClick={onClose}
            data-testid="notice-dismiss"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default withTheme(Notice);
