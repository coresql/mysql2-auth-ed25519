import { MariaDbContainer, type StartedMariaDbContainer } from '@testcontainers/mariadb';
import mysql from 'mysql2/promise';

import authPlugin from '../src';

describe('test connect', () => {
  let container: StartedMariaDbContainer | undefined;
  beforeAll(async () => {
    container = await new MariaDbContainer().start();

    const client = await mysql.createConnection({
      database: container?.getDatabase(),
      host: container?.getHost(),
      port: container?.getPort(),
      user: 'root',
      password: container?.getRootPassword(),
    });
    await client.query("INSTALL SONAME 'auth_ed25519'");
    await client.query("CREATE USER foo IDENTIFIED VIA ed25519 USING PASSWORD('password')");
    await client.query(`GRANT ALL PRIVILEGES ON \`${container.getDatabase()}\`.* TO 'foo'@'%'`);
    await client.query("FLUSH PRIVILEGES");
    await client.end();
  }, 20000);

  afterAll(async () => {
    await container?.stop();
  });

  it('should connect to db', async () => {
    const client = await mysql.createConnection({
      authPlugins: {
        'client_ed25519': authPlugin(),
      },
      database: container?.getDatabase(),
      host: container?.getHost(),
      port: container?.getPort(),
      user: 'foo',
      password: 'password',
    });
    const [results] = await client.query('SELECT 1');
    expect(results).toEqual([{ "1": 1 }]);
    await client.end();
  });
});
