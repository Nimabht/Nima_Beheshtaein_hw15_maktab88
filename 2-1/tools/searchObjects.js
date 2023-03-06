module.exports = (searchValue, objectArray) => {
  let matchingObjects = [];
  searchValue = searchValue.toLocaleLowerCase();
  for (let i = 0; i < objectArray.length; i++) {
    let currentObject = objectArray[i];
    for (let key in currentObject) {
      if (
        String(currentObject[key])
          .toLocaleLowerCase()
          .indexOf(searchValue) !== -1
      ) {
        matchingObjects.push(currentObject);
        break;
      }
    }
  }
  return matchingObjects;
};
