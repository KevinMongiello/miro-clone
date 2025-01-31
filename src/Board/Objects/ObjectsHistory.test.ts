// import { expect } from '@esm-bundle/chai';
// import { ObjectsHistory } from './ObjectsHistory';
// import { Objects } from './Objects';

// // Needs to be refactored to reflect current API of ObjectsHistory model.
// describe.skip('ObjectsHistory', () => {
//   it('can undo', () => {
//     const objects1 = new Objects();
//     const objects2 = new Objects()
//     objects2.addObject([1, 2], 3);
    
//     const history = new ObjectsHistory();
//     history.add(objects1);
//     history.add(objects2);
    
//     history.undo();
//     expect(history.currentState.userObjects).to.equal(objects1);
//   })

//   describe('next', () => {
//     it('is able to redo', () => {
//       const objects1 = new Objects();
//       const objects2 = new Objects()
//       const objects3 = new Objects()
//       objects2.addObject([1, 2], 3);
//       objects3.addObject([1, 2], 3);
//       objects3.addObject([3, 4], 5);
      
//       const history = new ObjectsHistory();
//       history.add(objects1);
//       history.add(objects2);
//       history.add(objects3);
      
//       history.undo();
//       expect(history.hasNext()).to.equal(true);
//     });

//     it('performs redo', () => {
//       const objects1 = new Objects();
//       const objects2 = new Objects()
//       const objects3 = new Objects()
//       objects2.addObject([1, 2], 3);
//       objects3.addObject([1, 2], 3);
//       objects3.addObject([3, 4], 5);
      
//       const history = new ObjectsHistory();
//       history.add(objects1);
//       history.add(objects2);
//       history.add(objects3);
      
//       history.undo();
//       history.redo()
//       expect(history.currentState.userObjects).to.equal(objects3);
//     });

//     describe('when saving during an undo state', () => {
//       const objects1 = new Objects();
//       const objects2 = new Objects()
//       const objects3 = new Objects()
//       objects2.addObject([1, 2], 3);
//       objects3.addObject([1, 2], 3);
//       objects3.addObject([3, 4], 5);
      
//       const history = new ObjectsHistory();
//       history.add(objects1);
//       history.add(objects2);
//       history.add(objects3);
      
//       history.undo();
//       history.undo()
//       const objects4 = new Objects();
//       objects4.addObject([9, 8], 7);
//       history.add(objects4);
      
//       it('forgets next states', () => {
//         expect(history.currentState.userObjects).to.equal(objects4);
//         expect(history.hasNext()).to.equal(false);
//       });

//       it('maintains last states', () => {
//         expect(history.hasLast()).to.equal(true);
//         history.undo();
//         expect(history.currentState.userObjects).to.equal(objects1);
//       });
//     });
//   });
// });