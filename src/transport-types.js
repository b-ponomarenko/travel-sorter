export const PLANE = {
  id: 1,
  formatter(trip) {
    const baggage = trip.transport.baggage;
    return `From ${trip.origin.name}, take flight ${trip.transport.flight} to ${trip.destination.name}. Gate ${trip.transport.gate}. Seat ${trip.transport.seat}. ${baggage ? `Baggage drop at ticket counter ${baggage}.` : 'Baggage will be automatically transferred from your last leg.'}`
  }
};
export const SHIP = {
  id: 2,
  formatter(trip) {
    return `From ${trip.origin.name}, take swim ${trip.transport.route} to ${trip.destination.name}. Your class ${trip.transport.class}. Your cabin ${trip.transport.cabin}. Your seat ${trip.transport.seat}`
  }
};
export const BUS = {
  id: 3,
  formatter(trip) {
    return `Take the bus from ${trip.origin.name} to ${trip.destination.name}. ${trip.transport.seat ? `Seat ${trip.transport.seat}` : `No seat assignment.`}.`
  }
};
export const TAXI = {
  id: 4,
  formatter(trip) {
    return `Take the taxi from ${trip.origin.name} to ${trip.destination.name}. Brand: ${trip.transport.brand}, color: ${trip.transport.color}.`
  }
};
export const TRAIN = {
  id: 5,
  formatter(trip) {
    return `Take train ${trip.transport.number} from ${trip.origin.name} to ${trip.destination.name}. Wagon ${trip.transport.wagon}. Seat ${trip.transport.seat}.`
  }
};

export default [PLANE, SHIP, BUS, TAXI, TRAIN];
