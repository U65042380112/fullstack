import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Home() {

    const [data,setData]= useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    })

    const nav = useNavigate();
    const handleDelete = (idworker) =>{
        axios.delete('http://localhost:5000/delete/'+idworker)
        .then(res => nav('/'))
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white rounded w-50'>
            <h2 className='text-center'>ตารางพนักงาน</h2>
            <Link to="/create" className='btn btn-success'>เพิ่มข้อมูล</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>รหัสพนักงาน</th>
                        <th>ชื่อ</th>
                        <th>นามสกุล</th>
                        <th>สำนักงาน</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d,i)=>(
                        <tr>
                            <td>{d.idworker}</td>
                            <td>{d.fname}</td>
                            <td>{d.lname}</td>
                            <td>{d.idoffice}</td>
                            <td>
                                <Link to={`/update/${d.idworker}`} className='btn btn-sm btn-primary m-1'>แก้ไขข้อมูล</Link>
                                <button onClick={e => handleDelete(d.idworker)} className='btn btn-sm btn-danger'>ลบข้อมูล</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home