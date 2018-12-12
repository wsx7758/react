import React,{Component} from 'react';
import './css/backTop.less';
class Backtop extends Component{
    backtop(){
        window.scrollTo(0,0);
    }
    render(){
        return <div style={{display:this.props.display}} className='backTop'>
            <div onClick={this.backtop}></div>
        </div>
    }
}
export default Backtop;