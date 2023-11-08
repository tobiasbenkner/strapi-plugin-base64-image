export default [
  {
    method: "GET",
    path: "/(.*)",
    handler: "myController.get",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/upload",
    handler: "myController.upload",
    config: {
      policies: [],
      auth: false,
    },
  },
];
