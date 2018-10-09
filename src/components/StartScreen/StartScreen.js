import React from 'react';
import './StartScreen.scss';
import logo from '../../assets/images/logo.png';

class StartScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newgame: false,
            input: '',
            difficulty: 'default'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }


    /**
     * handleChange()
     *
     * is defined as an instance method, which changes the local state.
     */

    handleChange(e) {
        this.setState({input: e.target.value});
    }

    /**
     * selectChange()
     *
     * is a method for intercept the difficulty of Game
     */

    selectChange(e) {
        this.setState({difficulty: e.target.value});
    }

    /**
     * handleClick()
     *
     * in the Toggle class, a handleClick method is defined as an instance method, which changes the local state.
     * In the render method, this.handleClick is passed to the button as an event handler.
     */

    handleClick() {
        if (this.state.input === '' || this.state.difficulty === 'default') {
            return
        }
        this.setState({newgame: true}, function () {
            this.props.sendData(this.state.input, this.state.newgame, this.state.difficulty);
        })
    }

    render() {
        return (

            <div className="home-screen">
                <div>
                    <img src={logo} alt="Minions Memory Game"/>
                </div>

                <div className="name-screen">
                    <input type="text" name="input" placeholder="Insert Your Name" onChange={this.handleChange}/>
                    <select onChange={this.selectChange}>
                        <option value="default">Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="play-screen">

                    <button onClick={this.handleClick}>PLAY</button>
                </div>
            </div>

        );
    }

}

export default StartScreen