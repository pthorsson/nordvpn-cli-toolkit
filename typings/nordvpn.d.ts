declare module NordVPN {
  // Country data

  export type CountryServerSet = {
    id: number;
    name: string;
    servers_count: number;
  };

  export type CountryTechnology = CountryServerSet & {
    groups: CountryServerSet[];
  };

  export type CountryGroup = CountryServerSet & {
    technologies: CountryServerSet[];
  };

  export type Country = {
    id: number;
    name: string;
    code: string;
    technologies: CountryTechnology[];
    groups: CountryGroup[];
  };

  // Recommended server data

  export type RecommendedServerLocation = {
    id: number;
    created_at: string;
    updated_at: string;
    latitude: number;
    longitude: number;
    country: {
      id: number;
      name: string;
      code: string;
      city: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        dns_name: string;
        hub_score: number;
      };
    };
  };

  export type RecommendedServerTechnology = {
    id: number;
    name: string;
    identifier: string;
    created_at: string;
    updated_at: string;
    metadata: any[];
    pivot: {
      status: string;
    };
  };

  export type RecommendedServerGroup = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    type: {
      id: number;
      created_at: string;
      updated_at: string;
      title: string;
      identifier: string;
    };
  };

  export type RecommendedServerIPs = {
    id: number;
    created_at: string;
    updated_at: string;
    server_id: number;
    ip_id: number;
    type: string;
    ip: {
      id: number;
      ip: string;
      version: number;
    };
  };

  export type RecommendedServer = {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    station: string;
    hostname: string;
    load: number;
    status: string;
    locations: RecommendedServerLocation[];
    technologies: RecommendedServerTechnology[];
    groups: RecommendedServerGroup[];
    ips: RecommendedServerIPs[];
  };

  // Connection status data

  export type ConnectionStatus = {
    location: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    ip: string;
    isp: string;
    status: boolean;
  };
}
