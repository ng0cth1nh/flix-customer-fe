const config = {
  screens: {
    RequestHistoryStackScreen: {
      screens: {
        InvoiceScreen: {
          path: 'invoice',
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
