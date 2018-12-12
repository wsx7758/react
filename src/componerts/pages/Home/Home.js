import React,{Component} from 'react';
import Header from '../../commons/Header';
import Banner from '../../commons/Banner';
import Footer from '../../commons/Footer';
import Backtop from '../../commons/Backtop';
import Headernav from './components/Headernav';
import axios from 'axios';
import './css/Home.less';
import {withRouter} from 'react-router-dom';
import store from '../../../store';
import * as action from '../../../actions';
class Home extends Component{
    constructor(){
        super();
        this.state={
            button:[],
            othergoods:{
                new_register:[],
                flash_sales:[],
                buy_list:[],
                article_list:[],
                current_topic:[],
                vip_member:[],
                five_example:{
                    ads_info:{},
                    product_info:[]
                }
            },
            recommend:[],
            display:'none',
            bgcolor:'rgba(0, 0, 0, .1)'
        }
    }

    componentWillMount(){
        // console.log(typeof(this.state.newperson))
        axios.get('https://apim.restful.5lux.com.cn/index/index_button')
        .then((res)=>{
            // console.log(res.data.data)
            this.setState({
                button:res.data.data.list
            })
            // console.log(typeof(this.state.button))
        })
        .catch((err)=>{
            console.log(err)
        });
        axios.get('https://apim.restful.5lux.com.cn/index/other_advert')
        .then((res)=>{
            // console.log(res.data.data)
            this.setState({
                othergoods:res.data.data
            })
        })
        .catch((err)=>{
            console.log(err)
        });
        axios.get('https://apim.restful.5lux.com.cn//index/columu_recommend')
        .then((res)=>{
            
            this.setState({
                recommend:res.data.data
            })
            // console.log(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    componentDidMount(){
        window.addEventListener('scroll',()=>{
            // console.log(document.documentElement.scrollTop)
            let Top=document.documentElement.scrollTop
             if(Top>330){
                this.setState({
                    display:'flex',
                    bgcolor:'rgba(0, 0, 0, 0.9)'
                })     
            }else{
                this.setState({
                    display:'none',
                    bgcolor:'rgba(0, 0, 0, 0)'
                }) 
            }
            
        })
    }
     //item.product_id,item.id,item.area_id
//id goodid product_id  cata_id      brand_id
    todetail(id,cata_id,brand_id){
        store.dispatch(action.setid(id));
        store.dispatch(action.setproduct_id(id));
        store.dispatch(action.setbrand_id(brand_id));
        store.dispatch(action.setcata_id(cata_id));
        store.dispatch(action.setgoods_id(id));
        this.props.history.push('/detail');
    }
    render(){
        // console.log(this.state.othergoods)        
        return <div className='home'>
            <Header bgcolor={this.state.bgcolor} display='block' />
            <Headernav display={this.state.display}/>
            <Banner/>
            <div className='content'>
                <div className='button'>
                    <ul>
                        {
                            this.state.button.map((item)=>{
                                return <li key={item.ad_link}>
                                    <img alt='' src={'https://images.weserv.nl/?url='+item.ad_code} />
                                    <div>{item.ad_name}</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className='recommend'>
                    <ul>
                        {
                            this.state.recommend.map((item,ind)=>{
                                return <li key={item.ad_code}>
                                    <img alt='' src={'https://images.weserv.nl/?url='+item.ad_code} />
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className='othergoods'>
                    <div className='goodbanner'>
                        {this.state.othergoods.new_register.map((item,ind)=>{
                            return <img alt='' key={item.ad_id} src={'https://images.weserv.nl/?url='+item.ad_code} />
                        })}
                        
                    </div>
                    <div className='goodbanner'>
                        {this.state.othergoods.vip_member.slice(0,1).map((item,ind)=>{
                            return <img alt='' key={ind} src={'https://images.weserv.nl/?url='+item.ad_code} />
                        })}
                    </div>
                    <div className='vip-con'>
                    {this.state.othergoods.vip_member.slice(1).map((item,ind)=>{
                            return <img alt='' key={ind} src={'https://images.weserv.nl/?url='+item.ad_code} />
                        })}
                    </div>
                    <div className='article_list'>
                        <span></span>
                        <img alt='' src={'https://images.weserv.nl/?url='+this.state.othergoods.five_example.ads_info.ad_code} />
                    </div>
                    <div className='five_example'>
                        <ul>
                        {this.state.othergoods.five_example.product_info.map((item,ind)=>{
                            return <li  onClick={this.todetail.bind(this,
                                item.product_id,item.id,item.area_id
                                )}
                            key={item.id} className='product_info'>
                                <img alt='' src={'https://images.weserv.nl/?url='+item.product_thumb} />
                                <div>{item.brand_name}</div>
                                <p>￥{item.product_price}</p>
                            </li>
                        })}
                        
                        </ul>
                    </div>
                    <div className='goodbanner'>
                        {this.state.othergoods.buy_list.map((item,ind)=>{
                            return <img alt='' key={item.ad_id} src={'https://images.weserv.nl/?url='+item.ad_code} />
                        })}
                    </div>
                    
                        {this.state.othergoods.article_list.map((item,ind)=>{
                            return <div key={item.ads_info.ad_id}><div className='article_list'>
                                <span></span>
                                <img alt='' src={'https://images.weserv.nl/?url='+item.ads_info.ad_code} />
                                <div className='artical-warpper'>
                                <p><strong>{item.ads_info.ad_name}</strong></p>
                                <div>{item.ads_info.ad_title}</div>
                                </div>
                                </div>
                                {item.ads_info.product_info.length?
                                    <div className='five_example'>
                                        <span></span>
                                        <ul>
                                        {item.ads_info.product_info.map((item,ind)=>{
                                            return <li onClick={this.todetail.bind(this,
                                            item.product_id,item.id,item.area_id
                                    //id goodid product_id  cata_id      brand_id
                                            )}
                                            key={item.id} className='product_info'>
                                                <img alt='' src={'https://images.weserv.nl/?url='+item.product_thumb} />
                                                <div>{item.brand_name}</div>
                                                <p>￥{item.product_price}</p>
                                            </li>
                                        })}
                                        
                                        </ul>
                                    </div>
                                :false}
                            </div>
                        })}
                    
                </div>
            </div>
            <Backtop display={this.state.display}/>
            <Footer/>
        </div>
    }
}
Home=withRouter(Home);
export default Home;