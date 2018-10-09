import React, {Component} from 'react';
import './CardView.scss';

class CardView extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * onClick ()
     * check if the card is matched and is have imageUp and after this
     * method set the properties of the signle Card that was clicked
     */

    onClick() {
        if (!this.props.matched && !this.props.imageUp) {
           this.props.onClick(this.props.id,this.props.image);
        }
    }

    render() {

        var image = this.props.image+'.png';

        return (
            <div className="flip-container">
                <div className="flipper">
                    <div className={"front "+(this.props.imageUp ? 'clicked' : '')} onClick={this.onClick} >
                        <img  src={require('../../assets/images/card-back.png')} alt='Memory Game' onClick={this.onClick}/>
                    </div>
                    <div className={"back "+(this.props.imageUp ? 'clicked' : '')}>
                        <img  src={require('../../assets/images/card-'+image)} alt='Memory Game' onClick={this.onClick}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardView;