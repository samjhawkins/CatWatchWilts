const alterCats = (catsArray) => {
  return catsArray.map((cat) => ({
    ...cat,
    active: cat.active || cat.active === 'true',
    cols: 1,
    rows: 1,
  }));
};

export default alterCats;
