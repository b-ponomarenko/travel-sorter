class TravelSorter {

  constructor(data) {
    this.data = [];
    this.sortedData = [];
    if (data && data instanceof Array) {
      this.data = data;
      this.count = data.length + 1;
    }
  }

  addTrips(trips) {
    this.data = [...this.data, ...trips];
  }

  addTrip(trip) {
    this.data.push(trip);
  }

  _getRootOrigin() {
    const destinationHashTable = {};

    this.data.forEach(trip => {
      destinationHashTable[this._getLocationHash(trip.destination.location)] = trip.destination.name;
    });

    for (let i = 0; i < this.data.length; i++) {
      const originLocation = this._getLocationHash(this.data[i].origin.location);

      if ( !destinationHashTable[originLocation] ) {
        return this.data[i];
      }
    }
  }

  _findAndPushAllDestinations(locationHash) {
    const trip = this.data.find((trip) => this._getLocationHash(trip.origin.location) === locationHash);
    if (!trip) {
      return ;
    }
    this.sortedData.push(trip);
    this._findAndPushAllDestinations(this._getLocationHash(trip.destination.location));
  }

  sortTrips() {
    const root = this._getRootOrigin();

    this.sortedData.push(root);
    this._findAndPushAllDestinations(this._getLocationHash(root.destination.location));
  }

  _getLocationHash(location) {
    return location.latitude * location.longitude;
  }

  getSortedTrips() {
    return this.sortedData;
  }

  printTrips(elementPath) {
    const element = document.querySelector(elementPath);

    if (!element) {
      throw new Error(`element "${elementPath}" not found!`)
    }

  }
}

module.exports = {
  TravelSorter
};
