import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://gayankanishka.github.io/"
        target="_blank"
      >
        Visit Me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[900]
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Gayan K.</Typography>
          <Copyright />
        </Container>
      </footer>
    </>
  );
};

export default Footer;
