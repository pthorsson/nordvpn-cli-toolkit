import fetch, { ResponseInit } from 'node-fetch';

/*
# NordVPN data sources

# - ENDPOINTS

[get countries]
https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_countries&lang=en

[get server recommendations] (encode)
https://nordvpn.com/wp-admin/admin-ajax.php?action=servers_recommendations&filters={"country_id":<country-id>}

[get user info]
https://nordvpn.com/wp-admin/admin-ajax.php?action=get_user_info_data

# - CONFIGS

[UDP]
https://downloads.nordcdn.com/configs/files/ovpn_udp/servers/<server-address>.udp.ovpn

[UDP]
https://downloads.nordcdn.com/configs/files/ovpn_tcp/servers/<server-address>.tcp.ovpn

server-address = ex. se177.nordvpn.com
*/

const BASE_URL = 'https://nordvpn.com/wp-admin/admin-ajax.php';

/**
 * Fetches available countries.
 */
export const getCountries = async (): Promise<NordVPN.Country[]> => {
  try {
    const res = await fetch(`${BASE_URL}?action=servers_countries&lang=en`);
    const countries = await res.json();

    validateRequest(res);

    return countries;
  } catch (error) {
    process.stderr.write(
      `Could not fetch countries from nordvpn servers - aborting\n\n${error.toString()}`
    );
    process.exit(1);
  }
};

/**
 * Fetches recommended top servers by given country.
 */
export const getRecommendedServers = async (
  countryId: number
): Promise<NordVPN.RecommendedServer[]> => {
  const country = encodeURIComponent(`{"country_id":${countryId}}`);

  try {
    const res = await fetch(
      `${BASE_URL}?action=servers_recommendations&filters=${country}`
    );
    const recommendedServers = await res.json();

    validateRequest(res);

    return recommendedServers;
  } catch (error) {
    process.stderr.write(
      `Could not fetch recommended servers from nordvpn servers - aborting\n\n${error.toString()}`
    );
    process.exit(1);
  }
};

/**
 * Fetches current connection status.
 */
export const getConnectionStatus = async (): Promise<NordVPN.ConnectionStatus> => {
  try {
    const res = await fetch(`${BASE_URL}?action=get_user_info_data`);
    const connectionStatus = await res.json();

    validateRequest(res);

    return connectionStatus;
  } catch (error) {
    process.stderr.write(
      `Could not fetch connection status from nordvpn servers - aborting\n\n${error.toString()}`
    );
    process.exit(1);
  }
};

/**
 * Fetches open vpn config file data by server and protocol.
 */
export const getConfigFileDataByServer = async (
  serverAddress: string,
  protocol: 'tcp' | 'udp' = 'tcp'
) => {
  const url = `https://downloads.nordcdn.com/configs/files/ovpn_${protocol}/servers/`;
  const res = await fetch(`${url}/${serverAddress}.${protocol}.ovpn`);
  const data = await res.text();

  return data;
};

const validateRequest = (res: ResponseInit) => {
  if (res.status !== 200) {
    throw new Error(`${res.status} - ${res.statusText}\nRequest: ${res.url}\n`);
  }
};
