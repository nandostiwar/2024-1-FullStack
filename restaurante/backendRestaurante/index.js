const app = require('./src/app.js');

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});