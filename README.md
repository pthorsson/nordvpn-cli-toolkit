# NordVPN CLI Toolkit

A toolkit of scripts for easing the use of NordVPN with OpenVPN in command line.

_**NOTE:** This script is dependent on the currently available endpoints for fetching required data from NordVPN's website. If they change them, these scripts will break._

_**NOTE:** For now this does not support global installation and should only be run directly by the built script files from the repository directory._

## Included scripts

Here are the included scripts and what they do.

### Get connection status

Script: `bin/get-connection-status`

Will make an request against the NordVPN `get_user_info_data` endpoint and return wether connected to NordVPN or not.

### Example

```
$ bin/get-connection-status

Status: connected

Location:      Sweden, Stockholm, Stockholm
IP address:    195.181.166.95
ISP:           Datacamp Limited
Coordinates:   17.9448 59.4032
```

### Get config file content by recommended server

Script: `bin/get-recommended-server-config`

Will fetch and output the OpenVPN config contents of a recommended server. The NordVPN recommended servers endpoint returns top 5 servers for given country.

#### Options

- `--country <country-code>` - [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) country code format. Defaults to `DEFAULT_COUNTRY` in `.env` file.
- `--offset <offset>` - Pick server in recommended servers list with offset. Valid values `0 - 4`. Defaults to `0`.
- `--auth-file <path-to-auth-file>` - Path to auth file to be included in the config file. Defaults to `AUTH_FILE` in `.env`.

### Example

```
$ bin/get-recommended-server-config --country SE --offset 2 > nordvpn-config.conf
```

_(Fetches config content for recommended server nr 3 for Sweden)_

## Prerequisites

1. Ensure dependencies
   - [Yarn](https://yarnpkg.com/) >= `v1.22.0` (not tested on previous versions)
   - [Node.js](https://nodejs.org/en/) >= `v10.16.3` (not tested on previous versions)
2. Install dependencies `yarn`
3. Set up `.env` file, use `.env.sample` as template

## Build

_Creates a build of the project_

Run build task `yarn build`

## Development

_Starts development mode with watch task_

Run development task `yarn dev`
