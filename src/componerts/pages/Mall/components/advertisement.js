import React,{Component} from 'react';
import Swiper from 'swiper';
import axios from 'axios';
import 'swiper/dist/css/swiper.min.css';
import './css/advertisement.less';
class Advertisement extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            storelist:[]
        }
    }
    
    componentWillMount(){
        var that=this;
        axios.get('https://apim.restful.5lux.com.cn/shop/get_flagship_recommend')
        .then((res)=>{
            this.setState({
                data:res.data.data
            })
            // console.log(res.data.data)
            this.mySwiper2 = new Swiper ('.swiper-container2', {
                loop: false, // 循环模式选项
                preloadImages: true, //所有图片加载完成后实例化
                // 如果需要分页器
                pagination: {
                    el: '.swiper-p2',
                },
                on: {
                    slideChangeTransitionEnd: function(){
                        that.getstorelist(this.activeIndex);
                    }
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        });
        this.getstorelist(0);
              
    }
    
    getstorelist(ind){
        axios.get('https://apim.restful.5lux.com.cn/shop/get_flagship_recommend')
        .then((res)=>{
            this.setState({
                storelist:res.data.data[ind].store_infos
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentWillUnmount(){
        delete this.mySwiper2
    }
    render(){
        return <div className='advertisement'>
            <div className="swiper-container swiper-container2">
                 <div className="swiper-wrapper">
                 {
                     this.state.data.map((item)=>{
                         return <div key={item.mb_page_id} className="swiper-slide">
                                <h3>{item.title}</h3>
                                <img alt='' src={item.thumb} />
                         </div>
                     })
                 }
                </div>
                <div className="swiper-pagination swiper-p2"></div>
            </div>
            <div className='son_scroll'>
                <ul>
                    {this.state.storelist.map((item)=>{
                        return <li key={item.store_id}>
                            <img alt='' src={item.store_thumb} />
                            <p>{item.store_title}</p>
                        </li>
                    })}
                    
                </ul>
            </div>
            <span className='allstores'>
                查看所有旗舰店  >
            </span>
        </div>
    }
}
export default Advertisement;