import { expect } from 'chai';
// const expect = require('chai').expect;
const {TravelSorter} = require('../src/travelSorter');
const data = [
  {
    "origin": {
      "name": "Miami",
      "location": {
        "latitude": -6.9185,
        "longitude": 113.3676
      }
    },
    "destination": {
      "name": "Madrid",
      "location": {
        "latitude": -45.40303,
        "longitude": -72.69184
      }
    }
  },
  {
    "origin": {
      "name": "Saint-Petersburg",
      "location": {
        "latitude": 47.50035,
        "longitude": 33.91748
      }
    },
    "destination": {
      "name": "Moscow",
      "location": {
        "latitude": 52.08806,
        "longitude": -7.62528
      }
    }
  },
  {
    "origin": {
      "name": "New York",
      "location": {
        "latitude": 22.53511,
        "longitude": 91.91919
      }
    },
    "destination": {
      "name": "Miami",
      "location": {
        "latitude": -6.9185,
        "longitude": 113.3676
      }
    }
  },
  {
    "origin": {
      "name": "Madrid",
      "location": {
        "latitude": -45.40303,
        "longitude": -72.69184
      }
    },
    "destination": {
      "name": "Berlin",
      "location": {
        "latitude": -7.0014,
        "longitude": 112.5106
      }
    }
  },
  {
    "origin": {
      "name": "Moscow",
      "location": {
        "latitude": 52.08806,
        "longitude": -7.62528
      }
    },
    "destination": {
      "name": "New York",
      "location": {
        "latitude": 22.53511,
        "longitude": 91.91919
      }
    }
  },
  {
    "origin": {
      "name": "Rome",
      "location": {
        "latitude": -8.4788,
        "longitude": 117.4132
      }
    },
    "destination": {
      "name": "London",
      "location": {
        "latitude": 1.15167,
        "longitude": 33.155
      }
    }
  },
  {
    "origin": {
      "name": "Berlin",
      "location": {
        "latitude": -7.0014,
        "longitude": 112.5106
      }
    },
    "destination": {
      "name": "Paris",
      "location": {
        "latitude": 48.68611,
        "longitude": 14.57678
      }
    }
  },
  {
    "origin": {
      "name": "London",
      "location": {
        "latitude": 1.15167,
        "longitude": 33.155
      }
    },
    "destination": {
      "name": "Beijing",
      "location": {
        "latitude": 45.7485,
        "longitude": 4.8467
      }
    }
  },
  {
    "origin": {
      "name": "Paris",
      "location": {
        "latitude": 48.68611,
        "longitude": 14.57678
      }
    },
    "destination": {
      "name": "Rome",
      "location": {
        "latitude": -8.4788,
        "longitude": 117.4132
      }
    }
  }
];


const sortedSummerTrips = new TravelSorter(data);
sortedSummerTrips.sortTrips();

describe('TravelSorter', () => {
  it('find first trip', () => {
    expect(sortedSummerTrips.sortedData[0].origin.name).to.be.equal("Saint-Petersburg");
    expect(sortedSummerTrips.sortedData[0].destination.name).to.be.equal("Moscow");

  })

  it('find second trip', () => {
    expect(sortedSummerTrips.sortedData[1].origin.name).to.be.equal("Moscow");
    expect(sortedSummerTrips.sortedData[1].destination.name).to.be.equal("New York");
  })

  it('find last trip', () => {
    const length = sortedSummerTrips.sortedData.length;
    expect(sortedSummerTrips.sortedData[length-1].origin.name).to.be.equal("London");
    expect(sortedSummerTrips.sortedData[length-1].destination.name).to.be.equal("Beijing");
  });

  it('count of trips', () => {
    expect(sortedSummerTrips.count).to.be.equal(10);
  })
})
