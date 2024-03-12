import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Create() {
    const[idworker,setIdworker] = useState('')
    const[fname,setFname] = useState('')
    const[lname,setLname] = useState('')
    const[idoffice,setIdoffice] = useState('')
    const[office,setOffice] = useState([])

    const nav = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/office').then(res => setOffice(res.data)).catch(err => console.log(err));
    })
    
    const handlesubmit =(event)=>{
        event.preventDefault();
        axios.post('http://localhost:5000/create', {idworker,fname,lname,idoffice})
        .then(res =>{
            nav('/');
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100 bg-primary'>
        <div className='bg-white rounded w-50 p-3'>
            <form onSubmit={handlesubmit}>
                <h2>เพิ่มข้อมูล</h2>
                <div className='mb-2'>
                    <label htmlFor=''>รหัสพนักงาน</label>
                    <input type='text' placeholder='ใส่รหัสพนักงาน' className='form-control'
                    onChange={e=>setIdworker(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>ชื่อ</label>
                    <input type='text' placeholder='ใส่ชื่อ' className='form-control'
                    onChange={e=>setFname(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>นามสกุล</label>
                    <input type='text' placeholder='ใส่นามสกุล' className='form-control'
                    onChange={e=>setLname(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <div>
                    <label htmlFor=''>สำนักงาน</label>
                    </div>
                    <select className='form-select' onChange={e=>setIdoffice(e.target.value)}>
                        {office.map((d)=>(
                            <option className='option' key={d.idoffice} value={d.idoffice}>{d.oname}</option>
                        ))}
                    </select>
                </div>
                <button className='btn btn-success'>ยืนยัน</button>
            </form>
        </div>
    </div>
  )
}

export default Create