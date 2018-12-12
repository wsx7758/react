import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { PullToRefresh , Toast} from 'antd-mobile';
import './css/others.less';
import "animate.css";
import store from '../../../../store';
import * as action from '../../../../actions';
class Others extends Component{
    constructor(){
        super();
        this.state={
            bigbanner:[],
            page:1,
            total:0,
            selectName:'',
            seldisplay:'none',
            sort:'',
            order:'',
            is_self:'',//快递
            price:'',//价格
            location_id:'',//发货地
            attr:'',//人群ID
            cata_id:'',//分类ID
            searchID:'',//品牌ID
            detailwarppersdisplay:'none',
            GoodsList:[],
            optone:'综合',
            isVisible:false,
            optdisplay:'none',
            allopt:[
                {
                    name:'综合',
                    sort:'',
                    order:''
                },
                {
                    name:'销量优先',
                    sort:'salesnum',
                    order:''
                },
                {
                    name:'价格由低到高',
                    sort:'product_price',
                    order:'ASC'
                },
                {
                    name:'价格由高到低',
                    sort:'product_price',
                    order:'DESC'
                },
                {
                    name:'新品优先',
                    sort:'inputtime',
                    order:'DESC'
                },
                {
                    name:'人气优先',
                    sort:'super_number',
                    order:'DESC'
                },
            ],
            opt:[
                {
                    name:'品牌',
                    id:0
                },
                {
                    name:'分类',
                    id:0
                },
                {
                    name:'筛选',
                    id:0
                }
            ],
            selectCon:{
                all_cate:[],
                between:[],
                brands_info:{
                    all_brand:[],
                    recomment_brand:[]
                },
                cat_info:{},
                express_info:[],
                filter:[
                    {
                        attr_list:[]
                    }
                ],
                location_list:[]
            },
            IsbrandState:0,
            IstypeState:0,
            pricebetweenheight:'',
            pricebetweenpick:'全部',
            Islocationheight:'',
            Islocationpick:'全部',
            Isfilterheight:'',
            Isfilterpick:'全部',
            IsexpressInfoheight:'',
            IsexpressInfopick:'全部',
            Isbrandpick:'全部',
            brandlh:'热门品牌',
            hotAll:['热门品牌','所有品牌'],
            AllTypedisplay:'none',
            alltypeSlideD:'alltypeSlideD',
            selectBrand:'全部',
            selectType:'全部'

        }
    }
    componentWillMount(){
        let {pathname}=this.props.location
        let id=pathname.split('=')[1]
        this.getcataid(id);
        // this.nextpage(id);
        this.getid(id,1);
        this.timer=setTimeout(()=>{this.getselectCon(id,this.state.total)},500)
        // this.getselectCon(id,this.state.total)
        
        
    }
    componentDidMount(){
        var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
        console.log('真实：',pageHeight)
    }
    getcataid(id){
        axios.get('https://apim.restful.5lux.com.cn/shop/cata_recommend',{
            params:{
                cata_id:id
            }
        })
        .then((res)=>{
            console.log('getcataid')
            this.setState({
                bigbanner:res.data.data.ads_list
            })
            // console.log(this.state.bigbanner)
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    nextpage(id,page,sort,order,cata_id,attr,is_self,price,location_id){
        console.log('nextpage')
        axios.get('https://apim.restful.5lux.com.cn/good/cata_goods_list',{
            params:{
                id:id,
                page:page,
                sort:sort,
                order:order,
                cata_id:cata_id,
                attr:attr,
                is_self:is_self,
                price:price,
                location_id:location_id
            }
        })
        .then((res)=>{
            this.setState({
                GoodsList:this.state.GoodsList.concat(res.data.data.goods_list),
                total:res.data.data.total
            })
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    getid(id,page){
        axios.get('https://apim.restful.5lux.com.cn/good/cata_goods_list',{
            params:{
                id:id,
                page:page
            }
        })
        .then((res)=>{
            console.log(res)
            this.setState({
                GoodsList:res.data.data.goods_list,
                total:res.data.data.total
            })
        })
    }
    componentWillReceiveProps(nextProps){
        let oldId=this.props.location.pathname.split('=')[1];
        let newId=nextProps.location.pathname.split('=')[1];
        if(oldId!==newId){
            this.getcataid(newId)
            // this.getid(newId,1)
            this.setState({
                GoodsList:[],
                page:1,
                Id:newId,
                optone:'综合'
            })
            this.resetting();
            this.nextpage(newId);
            this.getselectCon(newId,this.state.total)
            
        }
    }
    //排序显示
    optdisplay(){
        this.setState({
            optdisplay:this.state.optdisplay==='none'?'block':'none'
        })
    }
    //价格排序
    optone(name,sort,order){
        let {pathname}=this.props.location
        let id=pathname.split('=')[1]
        this.setState({
            optone:name,
            optdisplay:'none',
            page:1,
            GoodsList:[],
            sort:sort,
            order:order
        });
        this.nextpage(this.state.searchID===''?id:this.state.searchID,1,sort,order,this.state.cata_id,
        this.state.attr,
        this.state.is_self,
        this.state.price,
        this.state.location_id)
    }
    componentWillUnmount(){
        Toast.hide();
    }
      getselectsName(name){
          this.setState({
              selectName:name,
              seldisplay:'block',
              optdisplay:'none'
          })
      }
      setseldisplay(){
          this.setState({
            seldisplay:'none'
          })
      }
      //设置价格
      setpricebtween(val){
        this.setState({
            pricebetweenpick:val,
            price:val
        })
    }
    //设置发货地
    setIslocation(val,id){
        this.setState({
            Islocationpick:val,
            location_id:id
        })
    }
    setIsfilter(val,id){
        this.setState({
            Isfilterpick:val,
            attr:id
        })
    }
    //设置快递
    setIsexpressInfo(val,id){
        this.setState({
            IsexpressInfopick:val,
            is_self:id
        })
    }
    setIsexpressInfoH(){
        this.setState({
            IsexpressInfoheight:this.state.IsexpressInfoheight==='auto'?'':'auto'
        })
    }

    setIsfilterH(){
        this.setState({
            Isfilterheight:this.state.Isfilterheight==='auto'?'':'auto'
        })
    }
    //地址高亮
    setIslocationH(){
        this.setState({
            Islocationheight:this.state.Islocationheight==='auto'?'':'auto'
        })
    }
    //价格背景高亮
    setpricebetweenH(){
        this.setState({
            pricebetweenheight:this.state.pricebetweenheight==='auto'?'':'auto'
            
        })
    }
    //品牌背景高亮
    setbrandlh(name){
        this.setState({
            brandlh:name
        })
    }
    //设置分类小样
    setallypeDisplay(ind){
        let arr=this.refs.selectConType.querySelectorAll('.AllType');
        let arrb=this.refs.selectConType.querySelectorAll('#alltypeSlideD');
        arrb[ind].className=arrb[ind].className==='alltypeSlideU'?'alltypeSlideD':'alltypeSlideU';
        arr[ind].style.display=arr[ind].style.display==='block'?'none':'block';
        
        
    }
    //获取侧边栏信息
    getselectCon(id,total){
        console.log('getselectCon')
        console.log(id)
        console.log(total)
        axios.get('https://apim.restful.5lux.com.cn/good/shop_cata_filter',{
            params:{
                id:id,
                total:total
            }
        })
        .then((res)=>{
            
            this.setState({
                selectCon:res.data.data===null?this.state.selectCon:res.data.data
            })
            console.log(this.state.selectCon)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //筛选=》品牌
    toBrand(){
        this.setState({
            selectName:'品牌',
            IsbrandState:1
        })
    }
    //筛选=》分类
    toselectType(){
        this.setState({
            selectName:'分类',
            IstypeState:1
        })
    }
    //筛选品牌
    setselectBrand(name,id){
        this.setState({
            selectBrand:name,
            searchID:id
        })
    }
    //筛选品牌
    setoneBrand(val,id){
        this.resetting()
        if(this.state.IsbrandState===0){
            console.log('IsbrandState:0')
            axios.get('https://apim.restful.5lux.com.cn/good/cata_goods_list',{
                params:{
                    id:id
                }
            })
            .then((res)=>{
                this.setState({
                    GoodsList:res.data.data===null?[]:res.data.data.goods_list,
                    total:res.data.data===null?this.state.total:res.data.data.total===0?this.state.total:res.data.data.total,
                    searchID:id,
                    seldisplay:'none'
                })
                this.getselectCon(id,this.state.total);
            })
        }else{
            this.setState({
                IsbrandState:0,
                selectName:'筛选',
                selectBrand:val,
                searchID:id
            })
        }
    }
    //筛选分类
    setoneType(val,id){
        if(this.state.IstypeState===0){
            console.log('setoneType:0')
        }else{
            this.setState({
                IstypeState:0,
                selectName:'筛选',
                selectType:val,
                cata_id:id
            })
        }
    }
    //重置
    resetting(){
        this.setState({
            selectType:'全部',
            selectBrand:'全部',
            IsexpressInfopick:'全部',
            pricebetweenpick:'全部',
            Islocationpick:'全部',
            Isfilterpick:'全部',
            searchID:'',
            cata_id:'',
            attr:'',
            is_self:'',
            price:'',
            location_id:''
        })
    }
    //确定搜索
    confirmSearch(searchID,cata_id,attr,is_self,price,location_id,page){
        let oldId=this.props.location.pathname.split('=')[1];
        axios.get('https://apim.restful.5lux.com.cn/good/cata_goods_list',{
            params:{
                id:searchID===''?oldId:searchID,
                cata_id:cata_id,
                attr:attr,
                is_self:is_self,
                price:price,
                location_id:location_id,
                page:page
            }
        })
        .then((res)=>{
            this.setState({
                seldisplay:'none',
                GoodsList:res.data.data===null?[]:res.data.data.goods_list,
                total:res.data.data===null?this.state.total:res.data.data.total,
                sort:'',
                order:''

            })
            console.log(this.state.total)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    todetail(id,cata_id,brand_id){
        store.dispatch(action.setid(id));
        store.dispatch(action.setproduct_id(id));
        store.dispatch(action.setbrand_id(brand_id));
        store.dispatch(action.setcata_id(cata_id));
        store.dispatch(action.setgoods_id(id));
        this.props.history.push('/detail');
    }
    render(){
        return <div className='mall-others'>
        <div onClick={this.setseldisplay.bind(this)} style={{display:this.state.seldisplay}} className='selectMask animated fadeIn'></div>
        <PullToRefresh
                    damping={60}
                    direction='up'
                    refreshing={false}
                    onRefresh={() => {
                        let allpage=Math.ceil(this.state.total/20);
                        let oldId=this.props.location.pathname.split('=')[1];
                        if(this.state.page>=allpage){
                            Toast.offline('我是有底限的', 1)
                        }else{
                            this.setState({
                                page:this.state.page+1
                            })
                            this.nextpage(this.state.searchID===''?oldId:this.state.searchID,this.state.page,
                                this.state.sort,
                                this.state.order,
                                this.state.cata_id,
                                this.state.attr,
                                this.state.is_self,
                                this.state.price,
                                this.state.location_id
                            );
                        } 
                    }}
                >
            <div style={{display:this.state.optdisplay}} className='detailwarppers animated fadeIn'></div>
            <div className='others_banner'>
                {
                    this.state.bigbanner.map((item)=>{
                        return <img key={item.ad_id} alt='' src={item.ad_code} />
                    })
                }
            </div>
            <div className='others_opt'>
                <div onClick={this.optdisplay.bind(this)} className='optOne optName'>
                    <div>{this.state.optone}</div>
                    <p></p>
                </div>
                {this.state.opt.map((item,ind)=>{
                    return <div onClick={this.getselectsName.bind(this,item.name)} className='optName' key={ind}>{item.name}</div>
                })}
                <span></span>
                    <div style={{display:this.state.optdisplay}} className='allopt animated bounceInLeft'>
                            {
                                this.state.allopt.map((val,ind)=>{
                                    return <div onClick={this.optone.bind(this,val.name,val.sort,val.order)} key={ind}>
                                        {val.name}
                                    </div>
                                })
                            }
                    </div>
            </div>
            <div className='others_goods'>
            {this.state.GoodsList.length===0?<div>什么也没有</div>:
                    <ul>
                    {
                        this.state.GoodsList.map((item)=>{
                            return <li  onClick={this.todetail.bind(this,
                                item.product_id,item.id,item.area_id
                                )}
                            key={item.barcode}>
                                <img alt='' src={item.product_img} />
                                <h5>{item.brand_en_name}</h5>
                                <p>{item.name}</p>
                                <div>
                                    <span>￥{item.product_price}</span>
                                    <del>￥{item.market_price}</del>
                                </div>
                            </li>
                        })
                    }
                </ul>
                }
            </div>
            
            </PullToRefresh>
            <div style={{display:this.state.seldisplay}} className='selects animated bounceInRight'>
                        
                        
                {
                    this.state.selectName==='筛选'?
                        <div className='selectCon'>
                            <div className='textTop' onClick={this.setIsexpressInfoH.bind(this)}>
                                <h5>配送方式</h5>
                                <div>
                                    <span 
                                    className={this.state.IsexpressInfopick==='全部'?'':'Isselect'}>
                                        {this.state.IsexpressInfopick}
                                    </span>
                                <span className={this.state.IsexpressInfoheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                                </div>
                            </div>
                            <div className='textBom' style={{height:this.state.IsexpressInfoheight}}>
                                {
                                    this.state.selectCon.express_info.map((item)=>{
                                        return <span 
                                        className={this.state.IsexpressInfopick===item.name?'bglh':''}
                                        onClick={this.setIsexpressInfo.bind(this,item.name,item.id)}
                                        key={item.id}>{item.name}</span>
                                    })
                                }
                            </div>
                            <div className='textTop' onClick={this.setpricebetweenH.bind(this)}>
                                <h5>价格</h5>
                                <div>
                                    <span className={this.state.pricebetweenpick==='全部'?'':'Isselect'}>
                                    {this.state.pricebetweenpick}
                                    </span>
                                    <span  className={this.state.pricebetweenheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                                </div>
                            </div>
                            <div className='textBom' style={{height:this.state.pricebetweenheight}}>
                                {
                                    this.state.selectCon.between.map((item)=>{
                                        return <span className={this.state.pricebetweenpick===item.value?'bglh':''} 
                                        onClick={this.setpricebtween.bind(this,item.value)} key={item.value}>
                                        {item.value}</span>
                                    })
                                }
                            </div>
                            <div className='textTop'  onClick={this.setIslocationH.bind(this)}>
                                <h5>发货地</h5>
                                <div>
                                <span className={this.state.Islocationpick==='全部'?'':'Isselect'}>
                                {this.state.Islocationpick}
                                </span>
                                <span  className={this.state.Islocationheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                                </div>
                            </div>
                            <div className='textBom' style={{height:this.state.Islocationheight}}>
                                {
                                    this.state.selectCon.location_list.map((item)=>{
                                        return <span
                                        className={this.state.Islocationpick===item.address?'bglh':''} 
                                        onClick={this.setIslocation.bind(this,item.address,item.id)} key={item.id}>
                                        {item.address}</span>
                                    })
                                }
                            </div>
                            <div onClick={this.toselectType.bind(this)} className='textTop'>
                                <h5>分类</h5>
                                <div><span
                                    className={this.state.selectType==='全部'?'':'Isselect'}
                                    >
                                    {this.state.selectType}
                                    </span>
                                <span  className='textTop-slideRight'></span>
                                </div>
                            </div>
                            <div onClick={this.toBrand.bind(this)} className='textTop'>
                                <h5>品牌</h5>
                                <div><span className={this.state.selectBrand==='全部'?'':'Isselect'}>
                                
                                {this.state.selectBrand}
                                </span>
                                <span  className={'textTop-slideRight'}></span>
                                </div>
                            </div>
                            <div className='textBom' style={{height:'auto'}}>
                                {
                                    this.state.selectCon.brands_info.recomment_brand.map((item)=>{
                                        return <span 
                                        className={this.state.selectBrand===item.brand_name?'bglh':''}
                                        onClick={this.setselectBrand.bind(this,item.brand_name,item.brand_id)} key={item.brand_id}>{item.brand_name}</span>
                                    })
                                }
                                <span>查看更多</span>
                            </div>
                            {this.state.selectCon.filter.length===0?null:<div>
                                <div className='textTop' onClick={this.setIsfilterH.bind(this)}>
                                <h5>{this.state.selectCon.filter[0].attr_name}</h5>
                                <div>
                                    <span className={this.state.Isfilterpick==='全部'?'':'Isselect'}>
                                    {this.state.Isfilterpick}
                                    </span>
                                    <span  className={this.state.Isfilterheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                                </div>
                            </div>
                            <div className='textBom BomP' style={{height:this.state.Isfilterheight}}>
                                {
                                    this.state.selectCon.filter[0].attr_list.map((item)=>{
                                        return <span 
                                        className={this.state.Isfilterpick===item.attr_value?'bglh':''}
                                        onClick={this.setIsfilter.bind(this,item.attr_value,item.attr_value_id)} 
                                        key={item.attr_value_id}
                                        >
                                        {item.attr_value}</span>
                                    })
                                }
                            </div></div>
                            }
                            
                            <div className='selectFooter'>
                                <div onClick={this.resetting.bind(this)}>重置</div>
                                <div onClick={this.confirmSearch.bind(this,
                                this.state.searchID,
                                this.state.cata_id,
                                this.state.attr,
                                this.state.is_self,
                                this.state.price,
                                this.state.location_id,
                                1
                                    )
                                } 
                                
                                className='checklh'>确定</div>
                            </div>
                            
                            
                        </div>
                        
                    
                    :
                    <div className='selectCon'>
                        {
                            this.state.selectName==='品牌'?
                            <div className='selectCon-brand'>
                                <h3>{this.state.selectName}</h3>
                                <div className='hotAll'>
                                    <ul>
                                        {this.state.hotAll.map((item,ind)=>{
                                            return <li
                                            onClick={this.setbrandlh.bind(this,item)}
                                            className={this.state.brandlh===item?'colorlh':''}
                                            key={ind}>{item}</li>
                                        })}
                                    </ul>
                                </div>
                                {this.state.brandlh==='热门品牌'?
                                this.state.selectCon.brands_info.recomment_brand.map((item)=>{
                                    return <div
                                    onClick={this.setoneBrand.bind(this,item.brand_name,item.brand_id)}
                                     key={item.brand_id} className='hotBrand'
                                     >
                                     {item.brand_name}</div>
                                })
                                :
                                this.state.selectCon.brands_info.all_brand.map((item)=>{
                                    return <div key={item.first_name} className='All-brand'>
                                            <p>{item.first_name}</p>
                                            <ul>
                                                {item.child.map((val)=>{
                                                    return <li 
                                                    onClick={this.setoneBrand.bind(this,val.brand_name,val.brand_id)}
                                                    key={val.brand_id}>
                                                        {val.brand_name}
                                                    </li>
                                                })}
                                            </ul>
                                    </div>
                                })
                                }
                            </div>
                            
                            :
                            <div ref='selectConType' className='selectCon-type'>
                                <h3>{this.state.selectName}</h3>
                                {this.state.selectCon.all_cate.map((item,ind)=>{
                                    return <div className='selectType' key={item.pid}>
                                            <p onClick={this.setallypeDisplay.bind(this,ind)}>
                                                <span>{item.pname}</span> 
                                                <span id='alltypeSlideD' className={this.state.alltypeSlideD}></span>
                                            </p>
                                            <div style={{display:this.state.AllTypedisplay}} className='AllType'>
                                                <ul>
                                                    {item.children_name.map((val,ind)=>{
                                                        return <li 
                                                        onClick={this.setoneType.bind(this,val,item.children[ind])}
                                                        key={ind}>
                                                            {val}
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                    </div>
                                })}
                            </div>
                        }
                    </div>
                }
        </div>
            {/* <Selects total={this.state.total} seldisplay={this.state.seldisplay} name={this.state.selectName} /> */}
        </div>
    }
}
Others=withRouter(Others);
export default Others;