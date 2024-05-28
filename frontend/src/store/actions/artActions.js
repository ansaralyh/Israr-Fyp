
import axios from 'axios'
import {UPLOAD_ART_REQUEST,UPLOAD_ART_SUCCESS,UPLOAD_ART_FAIL,GET_ALL_ARTS_REQUEST,GET_ALL_ARTS_SUCCESS,GET_ALL_ARTS_FAIL,GET_USER_ARTS_REQUEST,GET_USER_ARTS_SUCCESS,GET_USER_ARTS_FAIL, DELETE_USER_ART_REQUEST, DELETE_USER_ART_SUCCESS, DELETE_USER_ART_FAIL, LOAD_ART_REQUEST, LOAD_ART_SUCCESS, LOAD_ART_FAIL} from '../constants/artConstants'


export const uploadArt = (artData)=> async (dispatch)=>{
    try {

        dispatch({type:UPLOAD_ART_REQUEST})

        const {data} = await axios.post('http://localhost:4000/api/v1/arts/create',artData)
        
        dispatch({type:UPLOAD_ART_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:UPLOAD_ART_FAIL,payload:error})
    }
}


export const getAllArts = ()=> async (dispatch)=>{
    try {
        dispatch({type:GET_ALL_ARTS_REQUEST})

        const {data} = await axios.get('http://localhost:4000/api/v1/arts')

        dispatch({type:GET_ALL_ARTS_SUCCESS,payload:data.arts})
    } catch (error) {
        dispatch({type:GET_ALL_ARTS_FAIL,payload:error})
    }
}


export const getUserArts = (id)=> async (dispatch,getState)=>{
    try {
        // const {user} = getState().user
        dispatch({type:GET_USER_ARTS_REQUEST})
        const {data} = await axios.post('http://localhost:4000/api/v1/arts/me',{id})
        dispatch({type:GET_USER_ARTS_SUCCESS,payload:data.arts})
        // console.log(user)
    } catch (error) {
        dispatch({type:GET_USER_ARTS_FAIL,payload:error})
    }
}


export const deleteUserArt = (id)=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_USER_ART_REQUEST})

        await axios.delete(`http://localhost:4000/api/v1/arts/${id}`)
        dispatch({type:DELETE_USER_ART_SUCCESS})
    } catch (error) {
        dispatch({type:DELETE_USER_ART_FAIL})
    }
}

export const getSingleArt = (id)=> async (dispatch)=>{
    try {
        dispatch({type:LOAD_ART_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/arts/${id}`)
        dispatch({type:LOAD_ART_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:LOAD_ART_FAIL,payload:error})
    }
}