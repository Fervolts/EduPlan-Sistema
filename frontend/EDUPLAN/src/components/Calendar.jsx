import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import
import dayjs from 'dayjs';

function MyC(){

    const localizer = dayjsLocalizer(dayjs);

    return(
    <div className='Calendario'>
        <Calendar 
        localizer={localizer}/>
    </div>
    );
}

export default MyC;


