import Collection from './index'

test('collection', () => {
  const collection = new Collection()
  collection.add({ test: true })
  collection.add({ test: true })
  console.log(collection.object, collection.array)
  expect(collection.array.length).toBe(2)
  expect(Object.keys(collection.object).length).toBe(2)
})
