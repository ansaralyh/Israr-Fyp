const express = require('express')
const { createArt, getSingleArt, deleteArt, getSingleUserArts, updateArtTitle, getAllArts } = require('../controllers/artController')

const router = express.Router()

router.route('/arts/create').post(createArt)
router.route('/arts/me').post(getSingleUserArts)
router.route('/arts/:id').get(getSingleArt).delete(deleteArt).put(updateArtTitle)
router.route('/arts').get(getAllArts)
// router.route('/')
module.exports = router