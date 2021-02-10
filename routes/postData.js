const express = require('express');
const { checkToken} = require('../auth/token_validation');

const router = express.Router();
const authenticateRouter = require('../controllers/authenticate');
const registerRouter = require('../controllers/register');
const agenceRouter = require('../controllers/agence');
const compteRouter = require('../controllers/compte');
const country = require('../controllers/country'); 

router.post('/login', authenticateRouter.authenticate);
router.post('/register', registerRouter.register);
router.post('/forgetpassword', authenticateRouter.forgetpassword);

router.post('/getAllagences', checkToken, agenceRouter.getAllagences);
router.post('/getID/:id', checkToken, agenceRouter.getID);
router.post('/getATM', checkToken, agenceRouter.getATM);
router.post('/getMonet', checkToken, agenceRouter.getMonetique);

router.post('/getTypeCompte', checkToken, compteRouter.getTypeCompte);
router.post('/getClients', checkToken,  compteRouter.getClients);
router.post('/getIDclt/:id', checkToken, compteRouter.getIDclients);

router.post('/getCountryBank',checkToken, country.getlocation);


module.exports = router;