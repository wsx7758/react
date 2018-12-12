import React,{Component} from 'react';
import './css/Headernav.less';
class Homenav extends Component{
    constructor(){
        super();
        this.state={
            navlist:[
                '上新',
                '海外馆',
                '闪购',
                '品牌',
                '专柜自提'
            ]
        }
    }
   
    componentWillMount(){
        
    }
    render(){
        return <div className='homenav'>
            <ul style={{display:this.props.display}}>{
                    this.state.navlist.map((item,ind)=>{
                        return <li key={ind}>{item}</li>
                    })
                }
                    
            </ul>
        </div>
    }
}
export default Homenav;