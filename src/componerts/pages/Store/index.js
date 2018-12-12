import React,{Component} from 'react';
import Store from './pages/Store';
import Storenearby from './pages/storenearby';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
class Index extends Component{
    componentWillMount(){
        // console.log(this)
    }
    render(){
        let {match}=this.props;
        // console.log(match)
        return <div>
            <Switch>
                <Route path={match.url+'/list'} component={Store} />
                <Route path={match.url+'/nearby'}  component={Storenearby} />
                <Redirect from={match.url} to={match.url+'/list'} exact/>
                <Redirect to="/404"/>
            </Switch>
        </div>
    }
}
Index=withRouter(Index);
export default Index;