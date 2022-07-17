const config = {
  screens: {
    RequestHistoryStackScreen: {
      screens: {
        RequestHistoryScreen: {
          screens: {
            DoneScreen: 'done',
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['flix://request/'],
  config,
};
export default linking;
