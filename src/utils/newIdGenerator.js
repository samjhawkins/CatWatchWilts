import { v4 as uuid } from 'uuid';
import logger from './logger';

const newIdGenerator = () => {
  const newId = uuid().replace(/-/g, '');
  logger('New id created:', newId);
  return newId;
};

export default newIdGenerator;
