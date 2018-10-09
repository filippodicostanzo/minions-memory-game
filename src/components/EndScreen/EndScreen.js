import React from 'react';
import './EndScreen.scss';
import win from '../../assets/images/win.png';

class StartScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * handleClick()
     * in the Toggle class, a handleClick method is defined as an instance method, which changes the local state.
     * In the render method, this.handleClick is passed to the button as an event handler.
     */

    handleClick() {
        this.props.restartData();
    }

    render() {
        return (

            <div className="home-screen">
                <div>
                    <img src={win} alt="Minions Memory Game"/>
                </div>

                <div className="name-screen">
                    <p>
                        Turn: {this.props.turnNo} | Time: {this.props.time}
                    </p>
                    <button onClick={this.handleClick}>RESTART</button>
                </div>
            </div>

        );
    }


}

export default StartScreen