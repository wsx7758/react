import React,{Component} from 'react';
import axios from 'axios';
import 'animate.css';
import './css/selects.less';
class Selects extends Component{
    constructor(){
        super();
        this.state={
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
            pricebetweenheight:'',
            pricebetweenpick:'',
            pricebetweenid:null,
            Islocationheight:'',
            Islocationpick:'',
            Islocationid:null,
            Isfilterheight:'',
            Isfilterpick:'',
            Isfilterid:null,
            IsexpressInfoheight:'',
            IsexpressInfopick:'',
            IsexpressInfoid:null,
            Isbrandpick:'',
            Isbrandid:null,
            brandlh:'热门品牌',
            hotAll:['热门品牌','所有品牌'],
            AllTypedisplay:'none'
            
        }
    }
    componentWillMount(){ 
        // console.log(this.props)
    }
    componentDidMount(){
    }
    getselectCon(id,total){
        // console.log(this)
        axios.get('https://apim.restful.5lux.com.cn/good/shop_cata_filter',{
            params:{
                id:id,
                total:total
            }
        })
        .then((res)=>{
            this.setState({
                selectCon:res.data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentWillReceiveProps(nextProps){
        let total=nextProps.total;
        let id=nextProps.id;
        console.log(nextProps)
        if(total!==this.props.total){
            this.getselectCon(4,total)
        }

    }
    setpricebtween(val){
        this.setState({
            pricebetweenpick:val
        })
    }
    setIslocation(val){
        this.setState({
            Islocationpick:val
        })
    }
    setIsfilter(val){
        this.setState({
            Isfilterpick:val
        })
    }
    setIsexpressInfo(val){
        this.setState({
            IsexpressInfopick:val
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
    setIslocationH(){
        this.setState({
            Islocationheight:this.state.Islocationheight==='auto'?'':'auto'
        })
    }
    setpricebetweenH(){
        this.setState({
            pricebetweenheight:this.state.pricebetweenheight==='auto'?'':'auto'
            
        })
    }
    setbrandlh(name){
        this.setState({
            brandlh:name
        })
    }
    setallypeDisplay(){
        this.setState({
            AllTypedisplay:this.state.AllTypedisplay==='none'?'block':'none'
        })
    }
    render(){
        // console.log(this.props)
        return <div style={{display:this.props.seldisplay}} className='selects'>
                        
                        
            {
                this.props.name==='筛选'?
                    <div className='selectCon'>
                        <div className='textTop' onClick={this.setIsexpressInfoH.bind(this)}>
                            <h5>配送方式</h5>
                            <div>
                                <span 
                                className={this.state.IsexpressInfopick===''?'':'Isselect'}>
                                    {this.state.IsexpressInfopick===''?'快递':this.state.IsexpressInfopick}
                                </span>
                            <span className={this.state.IsexpressInfoheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                            </div>
                        </div>
                        <div className='textBom' style={{height:this.state.IsexpressInfoheight}}>
                            {
                                this.state.selectCon.express_info.map((item)=>{
                                    return <span 
                                    className={this.state.IsexpressInfopick===item.name?'bglh':''}
                                    onClick={this.setIsexpressInfo.bind(this,item.name)}
                                    key={item.id}>{item.name}</span>
                                })
                            }
                        </div>
                        <div className='textTop' onClick={this.setpricebetweenH.bind(this)}>
                            <h5>价格</h5>
                            <div>
                                <span className={this.state.pricebetweenpick===''?'':'Isselect'}>
                                {this.state.pricebetweenpick===''?'全部':this.state.pricebetweenpick}
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
                            <span className={this.state.Islocationpick===''?'':'Isselect'}>
                            {this.state.Islocationpick===''?'全部':this.state.Islocationpick}
                            </span>
                            <span  className={this.state.Islocationheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                            </div>
                        </div>
                        <div className='textBom' style={{height:this.state.Islocationheight}}>
                            {
                                this.state.selectCon.location_list.map((item)=>{
                                    return <span
                                    className={this.state.Islocationpick===item.address?'bglh':''} 
                                    onClick={this.setIslocation.bind(this,item.address)} key={item.id}>
                                    {item.address}</span>
                                })
                            }
                        </div>
                        <div className='textTop'>
                            <h5>分类</h5>
                            <div><span>全部</span>
                            <span  className='textTop-slideRight'></span>
                            </div>
                        </div>
                        <div className='textTop'>
                            <h5>品牌</h5>
                            <div><span>全部</span>
                            <span  className={'textTop-slideRight'}></span>
                            </div>
                        </div>
                        <div className='textBom' style={{height:this.state.HeightAuto}}>
                            {
                                this.state.selectCon.brands_info.recomment_brand.map((item)=>{
                                    return <span key={item.brand_id}>{item.brand_name}</span>
                                })
                            }
                            <span>查看更多</span>
                        </div>
                        <div className='textTop' onClick={this.setIsfilterH.bind(this)}>
                            <h5>适用人群</h5>
                            <div>
                                <span className={this.state.Isfilterpick===''?'':'Isselect'}>
                                {this.state.Isfilterpick===''?'全部':this.state.Isfilterpick}
                                </span>
                                <span  className={this.state.Isfilterheight===''?'textTop-slidedown':'textTop-slideup'}></span>
                            </div>
                        </div>
                        <div className='textBom BomP' style={{height:this.state.Isfilterheight}}>
                            {
                                this.state.selectCon.filter[0].attr_list.map((item)=>{
                                    return <span 
                                    className={this.state.Isfilterpick===item.attr_value?'bglh':''}
                                    onClick={this.setIsfilter.bind(this,item.attr_value)} 
                                    key={item.attr_value_id}
                                    >
                                    {item.attr_value}</span>
                                })
                            }
                        </div>
                        <div className='selectFooter'>
                            <div>重置</div>
                            <div className='checklh'>确定</div>
                        </div>
                        
                        
                    </div>
                    
                
                :
                <div className='selectCon'>
                    {
                        this.props.name==='品牌'?
                        <div className='selectCon-brand'>
                            <h3>{this.props.name}</h3>
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
                                return <div key={item.brand_id} className='hotBrand'>{item.brand_name}</div>
                            })
                            :
                            this.state.selectCon.brands_info.all_brand.map((item)=>{
                                return <div key={item.first_name} className='All-brand'>
                                        <p>{item.first_name}</p>
                                        <ul>
                                            {item.child.map((val)=>{
                                                return <li key={val.brand_id}>
                                                    {val.brand_name}
                                                </li>
                                            })}
                                        </ul>
                                </div>
                            })
                            }
                        </div>
                        
                        :
                        <div className='selectCon-type'>
                            <h3>{this.props.name}</h3>
                            {this.state.selectCon.all_cate.map((item)=>{
                                return <div className='selectType' key={item.pid}>
                                        <p onClick={this.setallypeDisplay.bind(this)}><span>{item.pname}</span> <span className={this.state.AllTypedisplay==='none'?'alltypeSlideD':'alltypeSlideU'}></span></p>
                                        <div style={{display:this.state.AllTypedisplay}} className='AllType'>
                                            <ul>
                                                {item.children_name.map((item,ind)=>{
                                                    return <li key={ind}>
                                                        {item}
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
    }//
}

export default Selects;