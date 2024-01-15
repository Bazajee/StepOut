module.exports = {
   apps: [
      {
         name: "StepOut",
         script: "app.js",
         watch: false,
         //ignore_watch: ['',],
         env: {
            PORT: 3500,
         },
      },
   ],
};