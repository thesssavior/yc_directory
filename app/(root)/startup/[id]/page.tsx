import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import markdownit from 'markdown-it'
import View from '@/components/View';

const md = markdownit();

// ppr inactivated
const page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUPS_BY_ID_QUERY, {id});
    const author_img = post.author.image
    if (!post) return notFound() 
    const parsedContent = md.render(post?.pitch || '');
    return (
        <>
            <section className='pink_container !min-h-[230px]' style={{background: "linear-gradient(to right, #759b46, #eda597)"}}>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='subheading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container'>
                <img src={post.image} alt='thumbnail' className='w-full h-auto rounded-xl'/>
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3'>
                            {author_img &&
                                <Image src={author_img}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                                /> 
                            }
                            <p className='text-20-medium'>{post.author.name}</p>
                            <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
                        </Link>
                        <p className='category-tag'>{post.category}</p>
                    </div>
                    <h3 className='text-30-bold'>Class Details</h3>
                    {parsedContent? (
                        <article 
                            className='prose max-w-4xl font-work-sans break-all' 
                            dangerouslySetInnerHTML={{__html: parsedContent}}/>
                    ): (
                        <p className='no-result'>No details provided</p>
                    )}
                </div>  
                <hr className='divider'/>
                {/* TODO: recommended */}
            </section>
            <section>
                 <View id={id}/>
            </section>
        </>
    )
}

export default page