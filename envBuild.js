try {
  const env = require('./env.js')
  const fs = require('fs')
  console.log('Building environment variables file: \n', env)
  fs.writeFileSync('./public/env.js', `const env = ${JSON.stringify(env)}`)
} catch (error) {
  console.error('Unable to build environment variables file')
  throw error
}
