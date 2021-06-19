import Recat from 'react';

const weather = (props)=>{
    const weathericon = <h5 className="py-4"><i className={`wi ${props.weathericon} display-1`}></i></h5>;

    const temp = <h1 className="py-2"><i className={`wi ${props.icon.Temp} display-0.5`}></i>{props.temp_celsius}
                    <i className={`wi ${props.icon.Celsius} display-0.5`}></i></h1>

    const desc = <h4 className="py-3">Status: {props.description}</h4>
    return(
        <div className="container">
            <div className="cards pt-4" style={{color:'white'}}>
                <h1>{props.city}</h1>
                {weathericon}
                
                {props.temp_celsius?(temp):null}
                

                {/* show min max temparature*/}
                {minmaxTemp(props.temp_min, props.temp_max, props.icon)}

                {props.description?(desc):null}
            </div>
        </div>
    );
}

const minmaxTemp=(min, max, icon)=>{
    if(min && max){
        return(
            <h3>
                <span className="px-4">Min: {min}<i className={`wi ${icon.Celsius} display-0.5`}></i></span>
                <span className="px-4">Max: {max}<i className={`wi ${icon.Celsius} display-0.5`}></i></span>
            </h3>
        );
    }
    
}

export default weather;