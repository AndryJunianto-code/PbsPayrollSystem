import ShortUniqueId from 'short-unique-id';

const id = new ShortUniqueId();
const uid = id.seq();

export default uid;