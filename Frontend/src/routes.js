import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import GameHistory from './routes/game_history';
import DevPage from './routes/dev_page';
import AddGame from './routes/add_game';
import Rankings from './routes/ranking';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={DevPage}>
                <Redirect to="/DevPage" />
            </Route>
            <Route exact path="/GameHistory" component={GameHistory} />
            <Route exact path="/DevPage" component={DevPage} />
            <Route exact path="/AddGame" component={AddGame} />
            <Route exact path="/Rankings" component={Rankings} />
        </Switch>
    );
}

export default Routes;
