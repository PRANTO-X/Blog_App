import TrendingBlogs from "../blog/TrendingBlogs"

export default function CardArrangementOne ({blogs=[], loading=false, error=null, refetch, title=""}) {
    return(
        <div>
            <div className="flex items-center gap-3.5  border-l-4 border-indigo-600 pl-2 mb-6">
              <h2 className='text-2xl md:text-3xl font-bold'>{title}</h2>
              <span className='border-1 flex-1 border-indigo-600'></span>
            </div>
            <TrendingBlogs blogs={blogs} loading={loading} error={error} refetch={refetch}/>
        </div>
    )
}