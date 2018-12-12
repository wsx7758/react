import React,{Component} from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import './css/secKill.less';
class Seckill extends Component{
        constructor(){
            super();
            this.state={
                killlist:[]
            }
        }
        componentWillMount(){
            axios.get('https://apim.restful.5lux.com.cn/shop/seckill_info')
            .then((res)=>{
                this.setState({
                    killlist:res.data.data
                })
                this.mySwiper2 = new Swiper ('.swiper-container3', {
                    loop: true, // 循环模式选项
                    preloadImages: true, //所有图片加载完成后实例化
                    // 如果需要分页器
                    slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
                     centeredSlides: true,
                    effect : 'coverflow',
                    slidesPerView: 2,
                    centeredSlides: true,
                    coverflowEffect: {
                        slideShadows : false
                      },
                    
                    on: {
                        slideChangeTransitionEnd: function(){
                            // that.getstorelist(this.activeIndex);
                        }
                    }
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
      render() {
        return this.state.killlist===null?null:
        <div style={{display:this.state.killlist===null?'none':'block'}} className='Seckill'>
        
                <div>限时秒杀</div>
                <p>仅剩</p>
                <div className='seckillcon'> 
                    <div className="swiper-container swiper-container3">
                        <div className="swiper-wrapper">
                            {/* {
                                this.state.killlist.map((item)=>{
                                    return <div className="swiper-slide" key={item.id}>
                                    <div className='seckillconlist'>
                                        <div className='seckillcon-l'>
                                            <img alt='' src={item.thumb} />
                                        </div>
                                        <div className='seckillcon-r'>
                                            <div>{item.sku_title}</div>
                                            <div><span className='killprice'>秒杀价  {item.seckill_price}</span><del>{item.product_price}</del></div>
                                            <p className='buynow'>立即抢购</p>
                                        </div>
                                    </div>
                                    </div>
                                })
                            } */}
                        </div>
                    </div>
                </div>
        </div>
        
      }
}
export default Seckill;