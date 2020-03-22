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

type Response<T> = Promise<{
  error: Error | null;
  data: T | null;
}>;

const BASE_URL = 'https://nordvpn.com/wp-admin/admin-ajax.php';

/**
 * Fetches available countries.
 */
export const getCountries = async (): Response<NordVPN.Country[]> => {
  try {
    const res = await fetch(`${BASE_URL}?action=servers_countries&lang=en`);
    const countries = await res.json();

    validateResponse(res);

    return { error: null, data: countries };
  } catch (error) {
    return { error, data: null };
  }
};

/**
 * Fetches recommended top servers by given country.
 */
export const getRecommendedServers = async (
  countryId: number
): Response<NordVPN.RecommendedServer[]> => {
  const country = encodeURIComponent(`{"country_id":${countryId}}`);

  try {
    const res = await fetch(
      `${BASE_URL}?action=servers_recommendations&filters=${country}`
    );
    const recommendedServers = await res.json();

    validateResponse(res);

    return { error: null, data: recommendedServers };
  } catch (error) {
    return { error, data: null };
  }
};

/**
 * Fetches current connection status.
 */
export const getConnectionStatus = async (): Response<NordVPN.ConnectionStatus> => {
  try {
    const res = await fetch(`${BASE_URL}?action=get_user_info_data`);
    const connectionStatus = await res.json();

    validateResponse(res);

    return { error: null, data: connectionStatus };
  } catch (error) {
    return { error, data: null };
  }
};

/**
 * Fetches open vpn config file data by server and protocol.
 */
export const getConfigFileDataByServer = async (
  serverAddress: string,
  protocol: 'tcp' | 'udp' = 'tcp'
): Response<string> => {
  const url = `https://downloads.nordcdn.com/configs/files/ovpn_${protocol}/servers/`;
  try {
    const res = await fetch(`${url}/${serverAddress}.${protocol}.ovpn`);
    const configFileContent = await res.text();

    validateResponse(res);

    return { error: null, data: configFileContent };
  } catch (error) {
    return { error, data: null };
  }
};

/**
 * Checks if the status code of the response is anything other than 200
 * and throws an error if so.
 */
const validateResponse = (res: ResponseInit) => {
  if (res.status !== 200) {
    throw new Error(`${res.status} - ${res.statusText}\nRequest: ${res.url}\n`);
  }
};
