import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import DataPicker from './DatePicker';
import { CloseIcon, DownIcon } from '../../../../provider/IconProvider';
import toast, { Toaster } from 'react-hot-toast';
import useLoggedUserData from '../../../../hooks/useLoggedUserData';
import useSecureApiEndPoint from '../../../../hooks/useSecureApiEndPoint';

const BasicInfoForm = ({ action }) => {
  const [LoggedUser,loggedUserRefetch] = useLoggedUserData();
  const [userData,setUserData] = useState();
  useEffect(() => {
    if (LoggedUser && LoggedUser.length > 0) {
      setUserData(LoggedUser[0]);
    }
  }, [LoggedUser]);


  const {fullName ,gender,marital_status, date_of_Birth, nationalID, religion, emergency_contact} = userData || 'N/A';
  const [showGender,setShowGender]= useState(false);
  const [showMS,setShowMS]= useState(false);// MS = Marital Status
  const [showReligion,setShowReligion] = useState(false);
  const [selectGenderText,setSelectGenderText] = useState('');
  const [mSText,setMSText]= useState(''); // MS = Marital Status
  const [selectReligionText,setSelectReligionText] = useState('');
  const [DOB,setDOB]= useState('');
  // err handle
  const hideGenderRef = useRef(null);
  const hideMSRef = useRef(null); // MS = Marital Status
  const hideReligionRef = useRef(null);
  const genderData = ['Male','Female'];
  const MSData = ['Single','Married']; // MS = Marital Status
  const secureApiEndPoint = useSecureApiEndPoint();
  
  const regionData = [
    'Islam',
    'Hindu',
    'Christianity',
    'Buddhism',
    'Others'
  ];

   

    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

     
      const onSubmit = async(data) => {
        
          
        const basicInfoData = {
          fullName: data.firstName +' '+data.lastName,
          date_of_Birth : DOB,
          nationalID : data.nationalID,
          gender: selectGenderText === 'Select Gender' ? '' : selectGenderText,
          marital_status : mSText === 'Select Marital Status' ? '' : mSText,
          religion : selectReligionText === 'Select Religion'? "" : selectReligionText,
          emergency_contact : data.number
        }

     
        

         try {
          const response = await secureApiEndPoint.patch('/update-User-info', basicInfoData);
          if (response.data.data) {
            toast.success('User information update', {duration: 1000, position:'bottom-right'})
            loggedUserRefetch();
             setTimeout(()=> {action(false)},1000);
          }
         } catch (error) {
          console.log(error.message);
         }
         
         
         
         
      }

      const handleUpdateInfo = (e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e)
      }
    
     useEffect(() => {
       setSelectGenderText(gender || 'Select Gender');
       setMSText(marital_status || 'Select Marital Status');
       setSelectReligionText(religion || 'Select Religion');
       setDOB(date_of_Birth)
     },[userData])

       useEffect(() => {
        const handleOutsideClick = (e) => {
          if (hideGenderRef.current && !hideGenderRef.current.contains(e.target)) {
            setShowGender(false);
          }
           if (hideMSRef.current && !hideMSRef.current.contains(e.target)) {
            setShowMS(false);
          }
           if (hideReligionRef.current && !hideReligionRef.current.contains(e.target)) {
            setShowReligion(false);
          }
        };
        
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, []);
    
      
     if (!userData) {
      return;
     }
     
    return (
        <div>
            <h2 className='text-xl font-bold'>Edit Profile</h2>
            <h2 className='text-lg font-semibold text-gray-500 mt-2'>Basic Info</h2>

            <form className='mt-3' onSubmit={handleUpdateInfo}>
                <section className='lg:flex w-full gap-2  mb-5'>
                  <div className='w-full lg:w-1/2'>
                      <label className='text-sm text-gray-700' htmlFor="full-name">First Name</label> <br />
                      <input
                        className='border border-gray-500 rounded-md w-full h-10 text-sm pl-2 outline-none'
                        type="text"
                        // defaultValue={fullName ? fullName.split(' ')[0] : ''}
                        defaultValue={fullName.split(' ')[0] || ''}
                        {...register('firstName')}
                      />
                      
                      
                  </div>

                  <div className='w-full lg:w-1/2'>
                      <label className='text-sm text-gray-700' htmlFor="last name">Last Name</label> <br />
                      <input
                        className='border border-gray-500 rounded-md w-full h-10 text-sm pl-2 outline-none'
                        type="text"
                        defaultValue={fullName.split(' ')[1] || ''}
                        {...register('lastName')}
                      />
                      
                  </div>
                </section>

                <section className='lg:flex w-full gap-2 items-center mb-5'>
                  <div className='w-full lg:w-1/2'>
                      <label className='text-sm text-gray-700 pl-3' htmlFor="Date of Birth">Date of Birth</label> <br />
                      
                      <DataPicker defaultValue={date_of_Birth} storeDOB={setDOB}/>
                      
                  </div>
               

                  <div className='w-full lg:w-1/2'>
                      <label className='text-sm text-gray-700' htmlFor="National ID">National ID</label> <br />
                      <input
                        className='border border-gray-500 rounded-md w-full h-10 text-sm pl-2 outline-none'
                        type="number"
                        defaultValue={nationalID}
                        {...register('nationalID')}
                      />
                       
                  </div>
                </section>

                <section className='lg:flex items-center gap-2 mb-5'>
                  <div className='w-full lg:w-1/2 relative ' ref={hideGenderRef}>
                  <label className='text-sm text-gray-700' htmlFor="gender">Gender</label>
                    <div onClick={(e) => {
                      e.stopPropagation();
                      setShowGender(!showGender)
                    }} className='w-full h-10 flex items-center justify-between cursor-pointer border border-gray-500 outline-none rounded-md pl-2 text-sm transition-all duration-300 ease-in-out '>
                      
                       <p className=''>{ selectGenderText}</p>
                       {showGender ? <CloseIcon className='text-lg mr-1'/> : <DownIcon className='text-lg mr-1'/>}
                    </div>

                    {showGender ? <div className='w-full  shadow-xl border border-gray-300 rounded-lg mt-1 absolute z-10 bg-white'>
                         {genderData.map(item => <p key={item} onClick={() => {
                          setShowGender(!showGender);
                          setSelectGenderText(item)
                         }}
                          className='text-sm p-2  m-1 mt-1 rounded-lg cursor-pointer hover:bg-[#E1F2F8] transition-all duration-200 ease-in'>{item}</p>)}
                    </div> : ''}
                    
                   </div>

                   <div className='w-full lg:w-1/2 relative ' ref={hideMSRef}>
                   <label className='text-sm text-gray-700 ' htmlFor="Marital Status">Marital Status</label>
                    <div onClick={(e) => {
                      e.stopPropagation();
                      setShowMS(!showMS);
                    }} className='w-full h-10 flex items-center justify-between cursor-pointer border border-gray-500 outline-none rounded-md pl-2 text-sm transition-all duration-300 ease-in-out '>
                       <p className=''>{mSText}</p>
                       {showMS ? <CloseIcon className='text-lg mr-1'/> : <DownIcon className='text-lg mr-1'/>}
                    </div>

                    {showMS ? <div className='w-full  shadow-xl border border-gray-300 rounded-lg mt-1 absolute z-10 bg-white'>
                         {MSData.map(item => <p key={item} onClick={() => {
                          setShowMS(!showMS);
                          setMSText(item)
                         }}
                          className='text-sm p-2  m-1 mt-1 rounded-lg cursor-pointer hover:bg-[#E1F2F8] transition-all duration-200 ease-in'>{item}</p>)}
                    </div> : ''}
                    
                   </div>
                </section>


                <section className='lg:flex items-center gap-2'>
                  <div className='w-full lg:w-1/2 relative ' ref={hideReligionRef}>
                  <label className='text-sm text-gray-700' htmlFor="gender">Religion</label>
                    <div onClick={(e) => {
                      e.stopPropagation();
                      setShowReligion(!showReligion)
                    }} className='w-full h-10 flex items-center justify-between cursor-pointer border border-gray-500 outline-none rounded-md pl-2 text-sm transition-all duration-300 ease-in-out '>
                       <p className=''>{selectReligionText}</p>
                       {showGender ? <CloseIcon className='text-lg mr-1'/> : <DownIcon className='text-lg mr-1'/>}
                    </div>

                    {showReligion ? <div className='w-full  shadow-xl border border-gray-300 rounded-lg mt-1 absolute z-10 bg-white'>
                         {regionData.map(item => <p key={item} onClick={() => {
                          setShowReligion(!showReligion);
                          setSelectReligionText(item)
                         }}
                          className='text-sm p-2  m-1 mt-1 rounded-lg cursor-pointer hover:bg-[#E1F2F8] transition-all duration-200 ease-in'>{item}</p>)}
                    </div> : ''}

                    
                   </div>

                   <div className='w-full lg:w-1/2'>
                      <label className='text-sm text-gray-700' htmlFor="Emergency Contact">Emergency Contact(Number)</label> <br />
                      <input
                        className='border border-gray-500 rounded-md w-full h-10 text-sm pl-2 outline-none'
                        type="number"
                        placeholder='01XXXXXXXXX'
                        defaultValue={emergency_contact}
                        {...register('number')}
                      />
                      
                  </div>
                </section>

                   <hr  className='mt-5 bg-gray-600'/>


                   <div className='flex items-center justify-end gap-2 mt-5'>
                    <button onClick={() => action(false)} className=' w-20 h-10 text-[15px] border border-[#00026E] text-[#00026E] rounded-lg' type='button'>Clear</button>
                    <button className='w-20 h-10 bg-[#00026E] text-white rounded-lg' type='submit'>Save</button>
                   </div>
            </form>
          
        </div>
    );
};

export default BasicInfoForm;