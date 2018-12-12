let initState={//初始化
    id:'',
    from:'',
    mtoken:'',
    product_id:'',
    brand_id:'',
    cata_id:'',
    goods_id:''

}
                    //ES6语法
let getgoodDetail=(oldstate=initState,action)=>{
    switch(action.type){
        case 'SET_ID':
            return {
                ...oldstate,//扩展运算   复制了initState
                id:action.payload//覆盖了initState里的id
            }
        case 'SET_FROM':
            return {
                ...oldstate,
                form:action.payload
            }
        case 'SET_MTOKEN':
            return {
                ...oldstate,
                mtoken:action.payload
            }
        case 'SET_PRODUCT_ID':
            return {
                ...oldstate,
                product_id:action.payload
            } 
        case 'SET_BRAND_ID':
            return {
                ...oldstate,
                brand_id:action.payload
            } 
        case 'SET_CATA_ID':
            return {
                ...oldstate,
                cata_id:action.payload
            } 
        case 'SET_GOODS_ID':
            return {
                ...oldstate,
                goods_id:action.payload
            }     
        default:
            return oldstate;    
    }
}
export default getgoodDetail