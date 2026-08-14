const operatorLogos: Record<string, string> = {
  'Wideroe': '/logos/transport/wideroe.png',
  'Hurtigruten': '/logos/transport/hurtigruten.png',
  'Havila Voyages': '/logos/transport/havila-voyages.png',
  'Norled AS': '/logos/transport/norled.png',
  'Torghatten Nord AS': '/logos/transport/torghatten.png',
  'Boreal Sjoe AS': '/logos/transport/boreal.png',
  'Boreal Travel AS': '/logos/transport/boreal.png',
  'Brim Explorer': '/logos/transport/brim-explorer.png',
  'Reis Nordland': '/logos/transport/reis-nordland.png',
  'Svipper': '/logos/transport/svipper.png',
  'Snelandia': '/logos/transport/snelandia.png',
  'Bussring AS': '/logos/transport/bussring.png',
  'Bussring AS / Best Arctic': '/logos/transport/best-arctic.png',
  'NOR-WAY Bussekspress': '/logos/transport/nor-way.png',
  'Arctic Train': '/logos/transport/arctic-train.png',
  'SJ NORD': '/logos/transport/sj.png',
  'Vy': '/logos/transport/vy.png',
  'Tromsoe Taxi AS': '/logos/transport/tromso-taxi.png',
  'Bodoe Taxi SA': '/logos/transport/bodo-taxi.png',
  'Explore Alta': '/logos/transport/explore-alta.png',
  'Booking Kirkenes': '/logos/transport/booking-kirkenes.png',
  'Alta Taxi': '/logos/transport/alta-taxi.png',
  'Kirkenes Taxi': '/logos/transport/kirkenes-taxi.ico',
  'Arctic Guide Service': '/logos/transport/arctic-guide-service.png',
  'Fjord Tours': '/logos/transport/fjord-tours.png',
  'Norwegian Travel': '/logos/transport/norwegian-travel.png',
  'SAS': '/logos/transport/sas.png',
  'Norwegian': '/logos/transport/norwegian.png',
  'Wizz Air': '/logos/transport/wizz-air.png',
  'British Airways': '/logos/transport/british-airways.png',
  'KLM': '/logos/transport/klm.png',
  'Finnair': '/logos/transport/finnair.png',
};

export function getTransportOperatorLogo(operator: string): string | null {
  return operatorLogos[operator] ?? null;
}

export function getOperatorInitials(operator: string): string {
  return operator
    .replace(/\b(?:AS|SA|NORD)\b/gi, '')
    .split(/[\s/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}
