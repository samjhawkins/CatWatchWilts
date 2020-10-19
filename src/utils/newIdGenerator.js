import { v4 as uuidv4 } from 'uuid';
import logger from './logger';

const newIdGenerator = () => {
  const newId = uuidv4();
  logger('New id created:', newId);
  return newId;
};

export default newIdGenerator;
