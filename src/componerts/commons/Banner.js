import React,{Component} from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import '../commons/css/Banner.less';
import axios from 'axios';
class Banner extends Component{
    constructor(){
        super();
        this.state={
            bannerlist:[]
        }
    }
    componentWillMount(){
        
          axios.get('https://apim.restful.5lux.com.cn/index/index_slider')
        .then((res)=>{
            this.setState({
                bannerlist:res.data.data
            })
             
                this.mySwiper = new Swiper ('.swiper-container', {
                    loop: true,
                    preloadImages: true, 
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                        },
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    }
                  });
        })
        .catch((err)=>{
            console.log(err)
        });   
             
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        delete this.mySwiper
    }
    render(){
        return <div>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.state.bannerlist.map((item,ind)=>{
                            return <div className="swiper-slide" key={ind}>
                                <img alt='' src={item.silde_original} />
                            </div>
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
                
            </div>
        </div>
    }
}
export default Banner