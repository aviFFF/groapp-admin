module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/vendor/login',
        handler: 'login.login',
        config: {
          auth: false,
        },
      },
    ],
  };
  