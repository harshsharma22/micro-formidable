const formidable = require('formidable')
const Promise = require('bluebird')

function parseForm (req, options) {
  return new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm()
    Object.assign(form, options)
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log('err', err)
        reject(err)
      } else {
        Object.assign(req, {
          fields,
          files
        })
        resolve()
      }
    })
  })
};

module.exports = (options) => fn => async(req, res) => {
  options.maxFileSize = 2024*1024*1024;
  await parseForm(req, options)
  return fn(req, res)
}
