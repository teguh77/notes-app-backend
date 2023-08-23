const Hapi = require('@hapi/hapi');
const NotesService = require('./services/inMemory/NotesService');
const notes = require('./api/notes');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: 8000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log('Server started');
};

init();
