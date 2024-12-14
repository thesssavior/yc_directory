import React from 'react'

const Ping = () => {

  return (
    <div className='relative'>
        <div className='absolute -left-4 top-1'>
            <span className='flex size-[11x] '>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-ping opacity-75'></span>
                <span className='relative inline-flex size-[11px] bg-ping rounded-full'></span>
            </span>
        </div>
    </div>
  )
}

export default Ping