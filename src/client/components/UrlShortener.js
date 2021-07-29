import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: 600,
    },
  },
  link: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const UrlShortener = () => {
  const classes = useStyles()
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const onSubmit = async () => {
    const { data: shortenedUrl } = await axios.post('/api/shortenUrl', {
      url,
      host: window.location.origin,
    })

    if (shortenedUrl) {
      setShortUrl(shortenedUrl)
    }
  }

  return (
    <Container className={classes.root}>
      <TextField
        display="block"
        fullWidth
        variant="outlined"
        onChange={(e) => setUrl(e.target.value)}
        id="url"
        label="URL"
        type="text"
      />
      <Typography className={classes.link}>
        <Link
          hidden={!shortUrl}
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
        >
          {shortUrl}
        </Link>
      </Typography>
      <Box component="span" display="block">
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default UrlShortener
