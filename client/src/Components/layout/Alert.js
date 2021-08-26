import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {connect} from "react-redux";


const Alert = ({alerts}) =>{
    useEffect(()=>{
        console.log(alerts[0]);
    },[alerts]);
    return(
            <>
                {alerts.map(alert=>(<div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>))}
            </>
    )
};

Alert.propTypes = {
    alerts: propTypes.array.isRequired
};

const mapStateToProps = (state) =>({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);