import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div className='flex items-center gap-2'>
                <h3 className='font-semibold text-[#f0721d] '>{title}</h3>
                <span className='block w-10 h-[2px] bg-[#f0721d]'></span>
              </div>
    );
};

export default SectionTitle;