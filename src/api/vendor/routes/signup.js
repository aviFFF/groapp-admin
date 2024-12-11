module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/vendor/signup',
        handler: 'signup.signup',
        config: {
          auth: false,
        },
      },
    ],
  };
  