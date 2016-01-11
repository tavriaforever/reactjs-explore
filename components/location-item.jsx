import React from 'react';
import moment from 'moment';

export default React.createClass({
    handleClick() {
        this.props.onClick(this.props.address);
    },

    render() {
        let cls = 'list-group-item';

        if(this.props.active){
            cls += ' active-location';
        }

        return (
            <a className={cls} onClick={this.handleClick}>
                {this.props.address}
                <span className="createdAt">{ moment(this.props.timestamp).fromNow() }</span>
                <span className="glyphicon glyphicon-menu-right" />
            </a>
        );
    }
});
