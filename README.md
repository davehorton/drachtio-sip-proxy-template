# drachtio-sip-proxy-template

Template for a basic drachtio application that handles registration and proxies SIP INVITEs.  It is a simple shell of an application that is provided both as a learning pathway for drachtio and as something which can be scaffolded out into a full-fledged application.  For an example of a complete application with some similar features, please see [drachtio-basic-registrar](https://github.com/davehorton/drachtio-basic-registrar)

## Installation
Edit the [configuration file](config/default.json) as needed, then:

```
npm install
node app.js
```

## Configuration

The configuration file is [config/default.json](config/default.json).  It is pretty-self explanatory.  It includes:
- log level setting
- location of drachtio server to connect to
- a simple database of user / passwords organized by sip domain.
