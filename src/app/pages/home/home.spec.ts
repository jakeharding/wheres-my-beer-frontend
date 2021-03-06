import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import { EMPTY, Observable, of } from 'rxjs';
import Beer from '../../models/Beer';
import RecentBeer from '../../models/RecentBeers';
import { LIMIT } from '../../app.component';

/**
 * home.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 *
 * Test HomePage.
 */

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;

  const mockRecentBeer = {created_at: new Date(), uuid: 'recent', user: 'user', beer: 'beer'} as RecentBeer;
  const mockBeer = { uuid: 'beer', recents: [mockRecentBeer]} as Beer;

  const mockBeerProvider = {
    recents: jest.fn(() => of([mockBeer])),
    recommended: jest.fn(() => of([{} as Beer]))
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomePage],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: NavParams, useValue: {}},
        { provide: BeerProvider, useValue: mockBeerProvider}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the HomePage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  test('properties are set after initialization', () => {
    expect(component.loadMoreRecommended).toEqual(true);
    expect(component.loadMoreRecent).toEqual(true);
  });

  test('ionViewWillEnter sets up the BAC calculation', async () => {
    // BAC calculation may be removed so only adding lightweight testing to get coverage
    await component.ionViewWillEnter();
    expect(mockBeerProvider.recents).toHaveBeenCalledTimes(1);
    expect(mockBeerProvider.recommended).toHaveBeenCalledTimes(1);
  });

  test('getRecentBeers calls to get more recent beers', () => {
    component.loadMoreRecent = true;
    component.getRecentBeers({});
    expect(mockBeerProvider.recents).toHaveBeenCalledTimes(1);
  });

  test('getRecentBeers returns empty Observable', () => {
    component.loadMoreRecent = false;
    const result = component.getRecentBeers({});
    expect(mockBeerProvider.recents).not.toHaveBeenCalled();
    expect(result).toEqual(EMPTY);
  });

  test('getRecommendedBeers calls to get more recommended beers', () => {
    component.loadMoreRecommended = true;
    component.getRecommendedBeers({});
    expect(mockBeerProvider.recommended).toHaveBeenCalledTimes(1);
  });

  test('getRecommendedBeers returns empty Observable', () => {
    component.loadMoreRecommended = false;
    const result = component.getRecommendedBeers({});
    expect(mockBeerProvider.recommended).not.toHaveBeenCalled();
    expect(result).toEqual(EMPTY);
  });

  test('processRecommendedBeers returns undefined', () => {
    const result = component.processRecommendedBeers([], {target: {complete: jest.fn()}});
    expect(result).toBeUndefined();
    expect(component.loadMoreRecommended).toBe(false);
  });

  test('processRecommendedBeers increases offset and adds to the recommended', () => {
    const mockBeers = [{} as Beer];
    const offset = component.recommendedOffset;
    component.processRecommendedBeers(mockBeers, {target: {complete: jest.fn()}});
    expect(component.recommendedOffset).toBe(offset + LIMIT);
    expect(component.recommended).toContain(mockBeers[0]);
  });

  test('processRecentBeers returns undefined', () => {
    const result = component.processRecentBeers([], {target: {complete: jest.fn()}});
    expect(result).toBeUndefined();
    expect(component.loadMoreRecent).toBe(false);
  });

  test('processRecentBeers increases offset and adds to the recents', () => {
    const mockBeers = [{} as Beer];
    const offset = component.recommendedOffset;
    component.processRecentBeers(mockBeers, {target: {complete: jest.fn()}});
    expect(component.recentOffset).toBe(offset + LIMIT);
    expect(component.recents).toContain(mockBeers[0]);
  });
});
