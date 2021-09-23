const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Ed Sheeran'));
bands.addBand(new Band('Daft Punk'));
bands.addBand(new Band('Damas Gratis'));


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     client.on('mensaje', (payload) => {
         console.log('Mensaje',payload.nombre);
         io.emit('mensaje', {admin: 'Nuevo mensaje'});
     });

     client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
     });

     client.on('add-band', (payload) => {
         const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());
     });

     client.on('delete-band', (payload) => {
       bands.deleteBand(payload.id);
       io.emit('active-bands',bands.getBands());
    });

    //  client.on('emitir-mensaje', (payload) => {
    //     console.log(payload);
        
    //     //io.emit('emitir-mensaje', payload);// emite a Todos
    //     client.broadcast.emit('emitir-mensaje', payload);// emite a Todos menos el que lo emitió

    // });
  });
