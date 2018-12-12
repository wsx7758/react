import React,{Component} from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import store from '../../../../store';
import * as action from '../../../../actions';
import 'swiper/dist/css/swiper.min.css';
import './css/home.less';
import Advertisement from '../components/advertisement';
import Seckill from '../components/secKill';
import Moregoods from '../components/moregoods';
import {withRouter} from 'react-router-dom';
class Mallhome extends Component{
    constructor(){
        super();
        this.state={
            bannerlist:[],
            buttons:[],
            mallAlllist:{
                brands_auth:{
                    list:[]
                },
                fashion_guide:{
                    list:[]
                },
                fashion_video:{
                    list:[]
                },
                lux_preferential:{
                    list:[]
                },
                new_recommend:{
                    list:[]
                },
                oversea_recommend:{
                    list:[]
                },
                star_outfits:{
                    list:[]
                },
                tide_topic:{
                    list:[]
                },
                tips:{
                    list:[]
                },
                top5flag:{
                    list:[]
                },
                vip_special:{
                    list:[]
                }
            },
            page:1
        }
    }
    componentWillMount(){
        axios.get('https://apim.restful.5lux.com.cn/shop/slide')
        .then((res)=>{
            // console.log(res.data.data)
            this.setState({
                bannerlist:res.data.data
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
            //   console.log(this)
        })
        .catch((err)=>{
            console.log(err)
        });
        axios.get('https://apim.restful.5lux.com.cn/shop/buttons_info')
        .then((res)=>{
            // console.log(res.data.data.button_list)
            this.setState({
                buttons:res.data.data.button_list
            })
            // console.log(this.state.buttons)
        })
        .catch((err)=>{
            console.log(err)
        });
        axios.get('https://apim.restful.5lux.com.cn/shop/home_all_info')
        .then((res)=>{
            this.setState({
                mallAlllist:res.data.data,
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        delete this.mySwiper1
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
        // console.log(this.state.mallAlllist) 
        let isRender =true
        return (<div className='mallhome'>
                    <div className='mallcon'>
                        <div className='mallcon-banner'>
                            <div className="swiper-container swiper-container1">
                                <div className="swiper-wrapper">
                                {
                                    this.state.bannerlist.map((item)=>{
                                        return <div key={item.slide_id} className="swiper-slide">
                                            <img alt='' src={'https://images.weserv.nl/?url='+item.silde_original} />
                                        </div>
                                    })
                                }
                                </div>
                                <div className="swiper-pagination swiper-p1"></div>
                            </div>
                        </div>
                        <div className='fun_nav'>
                            <ul>
                                {
                                    this.state.buttons.map((item)=>{
                                        return <li key={item.ad_name}>
                                            <div style={{backgroundImage:"url("+item.ad_code+")"}}></div>
                                            <p>{item.ad_name}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <Seckill />
                        {isRender ? <Advertisement/> : null}
                        {/* <Advertisement /> */}
                        <div className='mallBuyAll'>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.fashion_video.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.fashion_video.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                    {this.state.mallAlllist.fashion_video.list.slice(0,1).map((res)=>{
                                        return <div className='big-img' key={res.ad_id}><img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                            <h5>{res.ad_name}</h5></div>
                                    })}
                                    <ul className='adv_firul'>
                                        {
                                            this.state.mallAlllist.fashion_video.list.slice(1).map((res)=>{
                                                return <li key={res.ad_id}>
                                                    <img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                                    <h6>{res.ad_name}</h6>
                                                </li>
                                            })
                                        } 
                                    </ul>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.star_outfits.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.star_outfits.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                    <div ><img className='imgone' alt='' src={'https://images.weserv.nl/?url='+this.state.mallAlllist.star_outfits.list.ad_code} />
                                    <p className='en_nameP'>{this.state.mallAlllist.star_outfits.list.ad_name}</p></div>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.oversea_recommend.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.oversea_recommend.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                    {this.state.mallAlllist.oversea_recommend.list.slice(0,1).map((res)=>{
                                        return <div className='big-img' key={res.ad_id}><img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                            <h5>{res.ad_name}</h5></div>
                                    })}
                                    <ul className='adv_firul'>
                                        {
                                            this.state.mallAlllist.oversea_recommend.list.slice(1).map((res)=>{
                                                return <li key={res.ad_id}>
                                                    <img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                                    <h6>{res.ad_name}</h6>
                                                </li>
                                            })
                                        } 
                                    </ul>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.vip_special.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.vip_special.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                    {this.state.mallAlllist.vip_special.list.slice(0,1).map((res)=>{
                                        return <div className='big-img' key={res.ad_id}><img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                            <h5>{res.ad_name}</h5></div>
                                    })}
                                    <ul className='adv_firul'>
                                        {
                                            this.state.mallAlllist.vip_special.list.slice(1).map((res)=>{
                                                return <li key={res.ad_id}>
                                                    <img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                                    <h6>{res.ad_name}</h6>
                                                </li>
                                            })
                                        } 
                                    </ul>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.new_recommend.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.new_recommend.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                        <div className='new_recommend'>
                                            {
                                                this.state.mallAlllist.new_recommend.list.map((res)=>{
                                                    return <div key={res.ad_id}>
                                                        <img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                                        <span className='new_recommendname'>{res.ad_name}</span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.top5flag.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.top5flag.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                        <div className='top5flag'>
                                            {
                                                this.state.mallAlllist.top5flag.list.map((res)=>{
                                                    return <div key={res.ad_code} className='top5flagname'>
                                                        <img alt='' src={'https://images.weserv.nl/?url='+res.ad_code} />
                                                        <div><img alt='' src={'https://images.weserv.nl/?url='+res.brand_logo} /></div>
                                                        <span className='new_recommendname'>{res.ad_name}</span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>{this.state.mallAlllist.fashion_guide.title}</h4>
                                <div className='en_name'><span></span><p>{this.state.mallAlllist.fashion_guide.title_en}</p><span></span></div>
                                <div className='adv_fir'>
                                        <div className='fashion_guide'>
                                            {
                                                this.state.mallAlllist.fashion_guide.list.map((res,ind)=>{
                                                    return <div key={ind} className='fashion_guidename'>
                                                        <img alt='' src={'https://images.weserv.nl/?url='+res.ad_top.ad_code} />
                                                        <div>
                                                            <ul>
                                                            {
                                                                res.product_info.map((val)=>{
                                                                    return <li key={val.id}
                                                                    onClick={this.todetail.bind(this,
                                                                        val.product_id,val.id,val.area_id
                                                                        )}
                                                                    >
                                                                        <img alt='' src={'https://images.weserv.nl/?url='+val.product_thumb} />
                                                                        <p>{val.brand_name}</p>
                                                                        <span>￥{val.product_price}</span>
                                                                    </li>
                                                                })
                                                            }
                                                            <li className='showAll'>
                                                                <img alt='' src='http://img550.5lux.com.cn/2017/05/05/pq/149398682373_160x160.png' />
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        
                                                    </div>
                                                })
                                            }
                                        </div>
                                </div>
                            </div>
                            <div className='mallBanners'>
                                <h4>大家都在买</h4>
                                <div className='en_name'><span></span><p>HOT  SALES</p><span></span></div>
                            </div>     
                        </div>
                        <Moregoods page={this.state.page} />
                    </div>
                </div>)
    }
}
Mallhome=withRouter(Mallhome);
export default Mallhome;