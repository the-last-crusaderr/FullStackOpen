import axios from 'axios'
const baseURL = '/api/persons'      





   function create(newObject) {
       const request = axios.post(baseURL, newObject)
       return request.then((response) => response.data)
   }


 function retrieve(){
        const request = axios.get(baseURL)
        return request.then (  (response)  => response.data)
}


 function remove (id) {
    const promise = axios.delete(`${baseURL}/${id}`)
}


    function update(newObject,id){
        const request = axios.put( `${baseURL}/${id}`,newObject)
        return request.then( response => response.data   )
    }



export {
    create,
    retrieve,
    remove,
    update
}
