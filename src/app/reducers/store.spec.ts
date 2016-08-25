import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/let';

import {
	Selected,
	getEntity,
	getEntities,
	getSelected
} from './store';

// Interface to use for testing of the EntityStore/Selected generics
interface Named {
	name: string;
};


/**
 * Describes all the store functions 
 * getEntities
 * getEntity
 * getSelected       
 */
describe('Store Functions', () => {

	let entities: BehaviorSubject < Selected < Named >> ;
	let entity1: Named = { name: 'one' };
	let entity2: Named = { name: 'two' };
	let entity3: Named = { name: 'three' };

	// Set up the BehaviorSubject before each test
	beforeEach(() => {
		entities = new BehaviorSubject( < Selected < Named >> {
			entities: {
				'1': entity1,
				'2': entity2,
				'3': entity3
			},
			ids: [1, 2, 3],
			selected: 3
		});
	});

	// testing the getEntity function
	it('"getEntity" should return a single entity when we get an entity', () => {
		entities.let(getEntity < Named > (2)).subscribe(
			(item: Named) => {
				expect(item).toBe(entity2);
			}
		);
	});

	// testing the getEntities function
	it('"getEntities" should return a list of entities', () => {
		entities.let(getEntities < Named > ()).subscribe(
			(list: [Named]) => {
				expect(list).toEqual([entity1, entity2, entity3]);
			}
		);
	});

	// testing the getSelected function
	it('"getSelected" should return the selected entity', () => {
		entities.let(getSelected < Named > ()).subscribe(
			(item: Named) => {
				expect(item).toBe(entity3);
			}
		);
	});
});
