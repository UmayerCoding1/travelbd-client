import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


const  DataPicker = ({defaultValue,storeDOB}) => {
  
  const defaultDate = defaultValue ? dayjs(defaultValue, 'YYYY-MM-DD') : null;
  
  

  
  
  const handleDateOfBirth = (newDate) => {
    storeDOB(newDate?.format('YYYY-MM-DD'));
  };
  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DemoContainer
      
        components={[
          'MobileDatePicker',
        ]}
        sx={{ width: '100%', 
         overflow: 'hidden', padding: '0px', border: '0px', paddingLeft: '-10px'}}
      >
        
        
          <MobileDatePicker onChange={handleDateOfBirth} sx={{
        
        borderRadius: '4px', 
        width: '100%', 
        height: '', 
        fontSize: '0.55rem', 
        paddingLeft: '8px', 
        outline: 'none', 
        border:'none'
      }} 
      />
      {/* // defaultValue={dayjs(dob)}/> */}
        
       
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DataPicker;