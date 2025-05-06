
import Skeleton from 'react-loading-skeleton';

export default function SkeletonShow(props){
    const showSkeleton=Array.from({length:props.length}).map((_,index)=>(
        <div className={props.className} key={index}> 
            <Skeleton  height={props.height} baseColor={props.baseColor} width={props.width} ></Skeleton>
            </div>
        
    )
    )
    return(
        <>
        {showSkeleton}
        </>
    )
}