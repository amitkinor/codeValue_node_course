import { getConfigValue } from './config/config';
import { app } from './app';

app.set('port', getConfigValue('APP_PORT') || 8000);

app.listen(app.get('port'), () => {
  console.log('Server is up');
  console.log('port is', app.get('port'));
  console.log('env is', app.get('env'));
});
