


const getMUIDimensions = (first, second) => {
  // const ratio = second / first;
  const image = {
    xs: 12,
    sm: 5,
  };
  // if (ratio === 1){
  //
  // } else if (ratio > 1) {
  //
  // } else if (ratio < 1) {
  //
  // } else if (ratio > 2) {
  //
  // } else if (ratio < 0.5) {
  //
  // }
  const div = {
    xs: 12 - image.xs,
    sm: 12 - image.xs,
  };
  return {
    image,
    div,
  }
};

export default getMUIDimensions;
