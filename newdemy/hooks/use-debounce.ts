import { useState,useEffect } from "react";

//we do not want to query the db everytime the user types. so we delay the query by atleast half a second(when user stops typing for half a second and we assume that the user stopped writing and then we query the db) This prevents multiple calls to the database

export function useDebounce<T>(value:T,delay?:number):T{
    const [debounceValue,setDebounceValue]=useState<T>(value);

    useEffect(()=>{
        const timer=setTimeout(()=>{setDebounceValue(value),delay || 500});

        return ()=>{
            clearTimeout(timer);
        }

    },[value,delay])

    return debounceValue;


}