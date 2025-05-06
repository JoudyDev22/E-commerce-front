export default function SliceData(data,end){
    return data.length>end?data.slice(1,end) +"...":data;
}