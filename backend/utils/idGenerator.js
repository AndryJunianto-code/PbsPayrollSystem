import ShortUniqueId from 'short-unique-id';


const generateId = () => {
    let id = new ShortUniqueId({length:6});
    const uid = id.rnd();
    return uid
}

export default generateId;