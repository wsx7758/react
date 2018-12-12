
export function setid(status){
    return {
        type:'SET_ID',
        payload:status
    }
}
export function setfrom(status){
    return {
        type:'SET_FROM',
        payload:status
    }
}
export function setmtoken(status){
    return {
        type:'SET_MTOKEN',
        payload:status
    }
}
export function setproduct_id(status){
    console.log(status)
    return {
        type:'SET_PRODUCT_ID',
        payload:status
    }
}
export function setbrand_id(status){
    return {
        type:'SET_BRAND_ID',
        payload:status
    }
}
export function setcata_id(status){
    return {
        type:'SET_CATA_ID',
        payload:status
    }
}
export function setgoods_id(status){
    return {
        type:'SET_GOODS_ID',
        payload:status
    }
}