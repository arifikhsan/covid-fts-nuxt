const { Router } = require('express')
const glob = require('glob')

const router = Router()

router.get('/cases', async function (req, res) {
  const options = {
    cwd: './static'
  }
//   const filenames = glob.sync('*', options)

  let items = [];
//   filenames.forEach(filename =>
//     items.push({
//       'src': '/'+filename
//     })
//   );

  return res.json({ data: items })
})
