# mysql2-auth-ed25519

Repository provides [MariaDB's ed25519 plugin](https://mariadb.com/kb/en/authentication-plugin-ed25519/)
to use as an auth plugin to [mysql2](https://www.npmjs.com/package/mysql2).

The code provided is a fork from
[mariadb-connector-nodejs/lib/cmd/handshake/auth/ed25519-password-auth.js](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/lib/cmd/handshake/auth/ed25519-password-auth.js#L1)

## Installation

```bash
npm install @corejs/mysql2-auth-ed255119
```

## Usage

```js
const authPlugin = require('@coresql/mysql2-auth-ed25519');
const client = mysql.createConnection({
  authPlugins: {
    'client_ed25519': authPlugin(),
  },
  // other settings
});
```
