// eslint-disable-next-line no-unused-vars
const getMUIDimensions = (first, second) => {
  // const ratio = second / first;
  const image = {
    xs: 12,
    sm: 5,
  };
  const div = {
    xs: image.xs === 12 ? undefined : 12 - image.xs,
    sm: image.sm === 12 ? undefined : 12 - image.sm,
  };
  return {
    image,
    div,
  };
};

export default getMUIDimensions;
