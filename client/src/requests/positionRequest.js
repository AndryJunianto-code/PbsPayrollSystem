import axios from 'axios';

export const getAllPosition = async(obj) => {
    const {data} = await axios.get('/position/getAllPosition')
    return data;
}

export const createPosition = async(obj) => {
    const {title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier} = obj
    const {data} = await axios.post('/position', {
        title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier
    })
    return data;
}

export const updatePosition = async(obj) => {
    const {title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier} = obj
    const {data} = await axios.put(`/position/${obj.id}`, {
        title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier
    })
    return data;
}