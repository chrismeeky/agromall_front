/**
 * Get the city and set the city input value to the one selected
 *
 * @param addressArray
 * @return {string}
 */
const getCity = async (addressArray) => {
  let city = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      "administrative_area_level_2" === addressArray[i].types[0]
    ) {
      city = addressArray[i].long_name;
      return city;
    }
  }
};
/**
 * Get the area and set the area input value to the one selected
 *
 * @param addressArray
 * @return {string}
 */
const getArea = async (addressArray) => {
  let area = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if (
          "sublocality_level_1" === addressArray[i].types[j] ||
          "locality" === addressArray[i].types[j]
        ) {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
};
/**
 * Get the address and set the address input value to the one selected
 *
 * @param addressArray
 * @return {string}
 */
const getState = async (addressArray) => {
  let state = "";
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_1" === addressArray[i].types[0]
      ) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  }
}
export { getCity, getArea, getState };
