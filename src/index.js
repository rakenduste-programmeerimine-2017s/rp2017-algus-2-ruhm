const express = require('express')
require('dotenv').config()

const app = express()

const listener = app.listen(process.env.APP_PORT || 3000, () =>
  console.log('App started in ' +
    process.env.NODE_ENV +
    ' on port ' +
    listener.address().port
  )
)
