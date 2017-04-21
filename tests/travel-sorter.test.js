import { expect } from 'chai';
import { TravelSorter } from '../src/travel-sorter';
import trips from './data.json';

const formatedText = `<ul><li>Take the taxi from Saint-Petersburg to Moscow. Brand: Ford, color: yellow.</li><li>From Moscow, take flight SB455 to New York. Gate 45B. Seat 3A. Baggage will be automatically transferred from your last leg.</li><li>Take train 035 from New York to Miami. Wagon 4. Seat 48.</li><li>From Miami, take flight SK455 to Madrid. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.</li><li>Take the bus from Madrid to Berlin. Seat 48.</li><li>From Berlin, take flight SB455 to Paris. Gate 45B. Seat 3A. Baggage will be automatically transferred from your last leg.</li><li>Take the bus from Paris to Rome. Seat 48.</li><li>From Rome, take swim SK123w to London. Your class 2. Your cabin 3. Your seat 15</li><li>From London, take flight SB455 to Beijing. Gate 45B. Seat 3A. Baggage will be automatically transferred from your last leg.</li></ul>`;

const sortedSummerTrips = new TravelSorter(trips);
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
  });

  it('show right formated text', () => {
    expect(sortedSummerTrips._getFormatedText()).to.be.equal(formatedText);
  })
});
