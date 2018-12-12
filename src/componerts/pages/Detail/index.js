import React,{Component} from 'react';
import axios from 'axios';
import './css/index.less';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Detailrecommend from './components/Detailrecommend';
import Backtop from '../../commons/Backtop';
import {Toast} from 'antd-mobile';
import store from '../../../store';
import 'animate.css';
class Detail extends Component{
    constructor(){
        super();
        this.state={
            headerNav:['商品','详情','推荐'],
            colorLH:'商品',
            DetailCon:{
                about_5lux:[],
                cata_thumb_new:[],
                comment_info: [],
                editor_recommend: [],
                flagship_stores:{},
                flashsale_info: [],
                goods_gallery:[],
                goods_info:{
                    cata_string:[],
                    promote:[],
                    store_info:[]
                },
                installment_info:[],
                member_activity: [],
                meta:{},
                oversea_advice:[],
                para_arr:[],
                rank:[],
                recite_info:[],
                relation_information:[],
                service_info:[],
                sku:{
                    all:[],
                    current:{attr:[]}
                },
                to_comment:{},
                user_price_info:{},
                wxh_info:{}

            },
            othersbanner:[],
            goodpresent:{
                brand_info:[],
                product_display:[],
                authentic_info:[],//正品
                service_weixin:[]
            },
            backtopdisplay:'none',
            detailMaskdisplay:'none',
            detailSelectHead:'',
            detailSelectCon:[],
            detailSelectDisplay:'block',
            fuwushuoming:[],
            checkbuy:{
                good_info:{},
                sku:{
                    all:[],
                    current:[]
                }
            },
            addNum:1,
            detailSelectFoot:'',
            detailSelectDisplay:'none',
            checkbuyInd:0
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/good/goodsdetail/',{
            params:{
                id:store.getState().id,
                from:'',
                mtoken:''
            }
        })
        .then((res)=>{
            this.setState({
                DetailCon:res.data.data
            })
            // console.log(this.state.DetailCon)
            this.mySwiper2 = new Swiper ('.swiper-container2', {
                loop: true,// 循环模式选项
                spaceBetween: 66,
                effect: 'fade',
                preloadImages: true, //所有图片加载完成后实例化
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                    },
                pagination: {
                  el: '.swiper-p2',
                }
              })
        });
        axios.get('https://apim.restful.5lux.com.cn/good/goodsdetail_bannerads',{
            params:{
                product_id:store.getState().product_id,
                brand_id:store.getState().brand_id,
                cata_id:store.getState().cata_id
            }
        })
        .then((res)=>{
            this.setState({
                othersbanner:res.data.data.banner_adv_info
            })
            this.mySwiper1 = new Swiper ('.swiper-container1', {
                loop: true,// 循环模式选项
                preloadImages: true, //所有图片加载完成后实例化
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                    },
                pagination: {
                  el: '.swiper-p1',
                }
              })
        });
        axios.get('https://apim.restful.5lux.com.cn/index.php/good/goodsdetail_desc/',{
            params:{
                goods_id:store.getState().goods_id
            }
        })
        .then((res)=>{
            this.setState({
                goodpresent:res.data.data.goods_detail_desc
            })
            console.log(this.state.goodpresent)
        });
        //慢必pei
        axios.get('https://apim.restful.5lux.com.cn/good/service_info/',{
            params:{
                product_id:store.getState().product_id
            }
        })
        .then((res)=>{
            this.setState({
                fuwushuoming:res.data.data
            })
            // console.log(this.state.fuwushuoming)
        })
    }
    componentDidMount(){
        console.log(this)
    //    setTimeout(()=>{ this.setdetailSelect('服务说明')},500)
    }
    setdetailSelectDisplay(){
        this.setState({
            detailSelectDisplay:'none'
        })
    }
    tabNav(name){
        this.setState({
            colorLH:name
        })
    }
    setdetailSelect(val){
        if(val==='分期详情'){
            this.setState({
                detailSelectHead:val,
                detailSelectFoot:'确定',
                detailSelectCon:this.state.DetailCon.installment_info,
                detailSelectDisplay:'block'
            })
        }
        if(val==='活动说明'){
            this.setState({
                detailSelectHead:val,
                detailSelectFoot:'确定',
                detailSelectCon:this.state.DetailCon.goods_info.promote,
                detailSelectDisplay:'block'
            })
        }
        if(val==='服务说明'){
            this.setState({
                detailSelectHead:val,
                detailSelectFoot:'确定',
                detailSelectCon:this.state.fuwushuoming,
                detailSelectDisplay:'block'
            })
        }
        if(val==='商品参数'){
            this.setState({
                detailSelectHead:val,
                detailSelectFoot:'确定',
                detailSelectCon:this.state.DetailCon.para_arr,
                detailSelectDisplay:'block'
            })
        }
        if(val==='选择'){
            axios.get('https://apim.restful.5lux.com.cn/good/goodsdetail_sku/',{
                params:{
                    product_id:store.getState().product_id
                }
            })
            .then((res)=>{
                this.setState({
                    checkbuy:res.data.data,
                    detailSelectFoot:'加入购物车',
                    detailSelectHead:val,
                    detailSelectDisplay:'block',
                })
            })
        }
    }
    setgoodsNum(val){
        
        if(val==='加'){
            this.setState({
                addNum:this.state.addNum+1
            })
        }else if(this.state.addNum<2){
            this.setState({
                addNum:1
            })
            Toast.info('买一件吧', 1)
        }
        else{
            this.setState({
                addNum:this.state.addNum-1
            })
        }
    }
    setcheckbuyInd(ind){
        this.setState({
            checkbuyInd:ind
        })
    }
    render(){
        return<div className='detail'>
        <div style={{display:this.state.detailSelectDisplay}} className='detailMask'></div>
            <header>
                <p onClick={this.props.history.goBack}
                className='p-l'></p>
                <div>
                    {
                        this.state.headerNav.map((item,ind)=>{
                            return <span key={ind} 
                            className={this.state.colorLH===item?'colorLH':''}
                            onClick={this.tabNav.bind(this,item)}
                            >
                            {item}
                            </span>
                        })
                    }
                </div>
                <p className='p-r'></p>
            </header>
            <div className='detailBanner'>
                <img alt='' src={this.state.DetailCon.shara_image} />
            </div>
            <div className='detailCom'>
                <div className='price-title'>
                    <div className='goodPrice'>
                        <span>￥</span>
                        <span className='nowprice'>{this.state.DetailCon.goods_info.product_price}</span>
                        <del>￥{this.state.DetailCon.goods_info.market_price}</del>
                        <span className='note'>{this.state.DetailCon.goods_info.promote_title}</span>
                        <span className='note'>{this.state.DetailCon.user_price_info.rank_name} ></span>
                    </div>
                    <div className='tittlewarpper'>
                        <div>{this.state.DetailCon.goods_info.sku_title}</div>
                        <p>
                        {this.state.DetailCon.goods_info.send_time_name}
                        <span>{this.state.DetailCon.goods_info.send_store}</span>
                        </p>
                    </div>
                </div>
                <div className='premote'>
                        <div onClick={this.setdetailSelect.bind(this,'分期详情')} className='premoteT'>
                            <span>分期支付</span>
                            {this.state.DetailCon.installment_str}
                        </div>
                        <div onClick={this.setdetailSelect.bind(this,'活动说明')} className='premoteM'>
                            {
                                this.state.DetailCon.goods_info.promote.slice(0,2).map((item,ind)=>{
                                    return <div key={ind}
                                        className='premoteT'
                                        >
                                        <span>{item.type_name}</span>
                                        {item.promote_title}
                                    </div>
                                })
                            }
                        </div>
                        <div onClick={this.setdetailSelect.bind(this,'活动说明')} className='premoteB'>
                            <ul>
                                {
                                    this.state.DetailCon.service_info.map((item,ind)=>{
                                        return <li key={ind}
                                        
                                        >
                                        <span></span>{item.name}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                </div>
                <div className='argborder'>
                    <div onClick={this.setdetailSelect.bind(this,'商品参数')}
                     className='argborderCon argborderB'>
                        <div>产品参数</div><p>></p>
                    </div>
                    <div onClick={this.setdetailSelect.bind(this,'选择')}
                     className='argborderCon'>
                        <div>选择：颜色/尺码</div><p>></p>
                    </div>
                </div>
                <div className='detailLogo'>
                    <div className='detailLogoL'>
                        <div>
                            <img alt='' src={this.state.DetailCon.goods_info.brand_logo} />
                            </div>
                            <p>{this.state.DetailCon.goods_info.brand_name}</p>
                    </div>
                    <span>查看    ></span>
                </div>
                <div className='othersBanner'>
                    <div className="swiper-container swiper-container1">
                    <div className="swiper-wrapper">
                        {
                            this.state.othersbanner.map((item,ind)=>{
                                return <div className="swiper-slide" key={ind}>
                                    <img alt='' src={item.silde_original} />
                                </div>
                            })
                        }
                    </div>
                    <div className="swiper-pagination swiper-p1"></div>
                    
                    </div>
                </div>
               
                {
                    this.state.goodpresent.brand_info.map((item,ind)=>{
                        return  <div key={item.ind} className='goodpresent'>
                            <div className='goodpresentT'>
                                <img alt='' src={item.brand_img_url} />
                                <p>{item.brand_title}</p>
                            </div>
                            <div className='goodpresentB'>
                                {item.brand_content}
                            </div>
                        </div>
                    })
                }
                    
                <div className='detailimg'>
                    <div
                     className='detailimgDiv'><span></span><p>商品详情</p><span></span></div>
                    {
                        this.state.goodpresent.product_display.map((item)=>{
                            return <img className='imgLong' key={item.good_id} alt='' src={item.desc_img_url}  />
                        })
                    }
                </div>
                <div className='detailimg'>
                    <div className='detailimgDiv'><span></span><p>正品保障</p><span></span></div>
                    {
                        this.state.goodpresent.authentic_info.map((item)=>{
                            return <img className='imgLong' key={item.ad_code} alt='' src={item.ad_code}  />
                        })
                    }
                </div>
                <div className='detailimg'>
                    {
                        this.state.goodpresent.service_weixin.map((item)=>{
                            return <img className='imgLong' key={item.ad_code} alt='' src={item.ad_code}  />
                        })
                    }
                </div>
                <div className='detailimgb'>
                    <div className='detailimgDiv'><span></span><p>关于第五大道</p><span></span></div>
                        <div className="swiper-container swiper-container2">
                        <div className="swiper-wrapper">
                            {
                                this.state.DetailCon.about_5lux.map((item,ind)=>{
                                    return <div className="swiper-slide" key={ind}>
                                        <img alt='' src={item.ad_code} />
                                    </div>
                                })
                            }
                        </div>
                        <div className="swiper-pagination swiper-p2"></div>  
                    </div>
                    {
                        this.state.DetailCon.recite_info.map((item)=>{
                            return <img className='imgLong' key={item.ad_code} alt='' src={item.ad_code}  />
                        })
                    }
                </div>
                <div className='detailTips'>
                    <div className='detailimgDiv'><span></span><p>购物温馨提示</p><span></span></div>
                    <div className='detailTips-con'>
                        <p>关于价格</p>
                        <div>第五大道价：数字部分为商品的销售价，是您最终决定是否购买商品的依据。</div>
                        <div>划线价：划线价为参考价或市场价，包含：品牌专柜标价、商品吊牌价或厂商指导价、建议零售价等，仅供参考，不作为购物依据。</div>
                        <div>折扣：若商品显示出某个具体的折扣数字，计算出的优惠比例或优惠金额，仅供参考。</div>
                        <p>关于商品详情</p>
                        <div>商品详情包含商品图片、尺寸、材质、产地、功能等，是遵照经销商提供的资料录入，商品图片部分由品牌方／经销商提供，部分由第五大道自行拍摄，不排除产生的轻微色差，若因此出现的购买差错，我们会协助办理退换货，但不作为索赔依据。</div>
                        <p>关于物流</p>
                        <div>第五大道坚持快速、安全把您的商品送达目的地，若出现错发、漏发等错误请及时告知我们，我们会第一时间解决问题，挽回您的损失。</div>
                    </div>
                </div>
                <div className='detailAinfo'>
                    <div className='detailimgDiv'><span></span><p>关联咨询</p><span></span></div>
                    <ul>
                        {
                            this.state.DetailCon.relation_information.map((val)=>{
                                return <li key={val.id}
                                
                                >
                                <img alt='' src={val.thumb} />
                                <div>
                                    <p>{val.content}</p>
                                    <p className='detailAinfoP'><span></span>{val.view_number} 阅读</p>
                                </div>
                                </li>
                            })
                        }
                    </ul>
                    
                </div>
                <div className='youLike'>
                    <Detailrecommend/>
                </div>
            </div>
            <div className='detailSelect animated bounceInUp' style={{display:this.state.detailSelectDisplay}}>
                <div style={{display:this.state.detailSelectFoot==='确定'?'block':'none'}} className='detailSelectHead'>{this.state.detailSelectHead}
                    <span onClick={this.setdetailSelectDisplay.bind(this)}></span>
                </div>
                
                    {
                        this.state.detailSelectHead==='分期详情'?
                        <ul className='periodizationul'>
                        {this.state.DetailCon.installment_info.map((val,ind)=>{
                            return <li key={ind}>
                                <p>{val.installment_desc}</p>
                                <span>{val.service_charge_desc}</span>
                            </li>
                        })}
                        </ul>
                        
                        :
                        this.state.detailSelectHead==='活动说明'?
                        <ul className='activityul'>
                        {this.state.DetailCon.goods_info.promote.map((val,ind)=>{
                            return <li key={ind}>
                                <div>
                                    <span className='activityspanL'>{val.type_name}</span>
                                    <p> {val.promote_title}</p>
                                </div>
                                
                                <span className='activityspanR'></span>
                            </li>
                        })}
                        </ul>
                        
                        :
                        this.state.detailSelectHead==='服务说明'?
                        <ul className='serviceul'>
                        {this.state.fuwushuoming.map((val,ind)=>{
                            return <li key={val.name}>
                                <div>
                                    <span className='servicespan'></span>
                                    <p> {val.name}</p>
                                </div>
                                {
                                    val.desc.indexOf('n')===-1?
                                    <p className='servicep'>{val.desc}</p>
                                    :
                                    val.desc.split("\\n").map((val,ind)=>{
                                        return <p className='servicep' key={ind}>{val}</p>
                                    })
                                }
                            </li>
                        })}
                        </ul>
                        
                        :
                        this.state.detailSelectHead==='商品参数'?
                        <ul className='parameterul'>
                        {this.state.detailSelectCon.map((val,ind)=>{
                            return <li key={ind}>
                                <span>{val}</span>
                            </li>
                        })}
                        </ul>
                        :
                        <div className='checkBuycon'>
                            <div className='checkBuyconHead'>
                                <img alt='' src={this.state.checkbuy.good_info.thumb} />
                                <p onClick={this.setdetailSelectDisplay.bind(this)} className='checkBuyconHeadP'></p>
                                <div>
                                    <h5>{this.state.checkbuy.good_info.sku_title}</h5>
                                    <span>￥{this.state.checkbuy.good_info.show_price}x 1</span>
                                    {
                                        this.state.checkbuy.sku.current.map((val)=>{
                                            return <p key={val.attr_name}>{val.attr_name}:{val.attr_val}</p>
                                        })
                                    }
                                </div>
                            </div>
                            <div className='checkBuyconMain'>
                                {
                                   this.state.checkbuy.sku.all.map((val)=>{
                                       return <div key={val.attr_name}>
                                       <p>{val.attr_name}</p>
                                       <ul>
                                           {
                                               val.attr_val.map((item,ind)=>{
                                                   return <li key={item.attr_value}
                                                   className={this.state.checkbuyInd===ind?'pickLi':''}
                                                   onClick={this.setcheckbuyInd.bind(this,ind)}
                                                   > 
                                                       {item.attr_value}
                                                   </li>
                                               })
                                           }
                                       </ul>
                                       </div>
                                   }) 
                                }
                                <p>数量</p>
                                <div className='addNum'>
                                    <span onClick={this.setgoodsNum.bind(this,'减')}
                                    className='addL'></span>
                                    <span className='num'>{this.state.addNum}</span>
                                    <span onClick={this.setgoodsNum.bind(this,'加')}
                                    className='addR'></span>
                                </div>
                                
                            </div>
                        </div>
                    }
                
                <p onClick={this.state.detailSelectFoot==='确定'?this.setdetailSelectDisplay.bind(this)
                :
                null} >
                    {this.state.detailSelectFoot}
                </p>
            </div>
            <Backtop display={this.state.backtopdisplay} /> 
            <footer>
                <div className='customShoppingbag'><span className='custom'></span>客服</div>
                <div className='customShoppingbag'><span className='shopbag'></span>购物袋</div>
                <div className='addgoodBuynow addgood'>加入购物袋</div>
                <div className='addgoodBuynow buynow'>立即购买</div>
            </footer>
           
            
        </div>
    }
}
export default Detail