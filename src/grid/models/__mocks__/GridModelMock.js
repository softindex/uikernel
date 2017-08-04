import GridCollectionModel from '../GridCollectionModel';

class GridModelMock extends GridCollectionModel {
  constructor(...args) {
    super(...args);
    this.read = jest.fn(this.read);
    this.getRecord = jest.fn(this.getRecord);
    this.update = jest.fn(this.update);
    this.create = jest.fn(this.create);
  }
}

export default GridModelMock;
