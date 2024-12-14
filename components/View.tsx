import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'

const View = async ({id}: {id: string}) => {
    const {views: totalViews} = await client.fetch(VIEWS_QUERY, {id})
    await writeClient.patch(id).set({views: totalViews+1}).commit() 
    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping/>
            </div>
            <p className='view-text'>
                <span className='font-black'>Views: {totalViews}</span>
            </p>
        </div>
    )
}

export default View