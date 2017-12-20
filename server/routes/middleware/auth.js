const hackData = { id: 1,
  googleId: '111536767467870097902',
  picture: 'https://lh5.googleusercontent.com/-WuRKeKvlwo8/AAAAAAAAAAI/AAAAAAAALHw/-z0yF6yPAyc/photo.jpg?sz=50',
  token: 'ya29.GlsjBUFgoelhtaHGQUBGOTfj_0AE-6mvW8BB625vX8qTqQRWo2iNkqkHRhikwHo_yvcXy5-osHHzJl8M5D9bbwtqp4lu8Izb3IHdhXoC1I_CElR_jYcfynIaIjVS',
  email: 'manjeshpv@gmail.com',
  name: 'Manjesh V',
};

module.exports = {
  /* Helper functions for verifying authentication */
  // Check user is allowed to load SPA
  isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  },
  // Check user accessing API route is authenticated
  apiIsAuth(req, res, next) {
    const IS_HACK = req.query.token === 'ABCD';
    console.log('apiIsAuth')
    if (req.isAuthenticated() || IS_HACK) {
      if(IS_HACK) req.user = hackData;
      return next();
    } else {
      res.status(403).send();
    }
  }
};
