import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [idoffice, setIdoffice] = useState('');
    const [office, setOffice] = useState([]);
    const [odata, setOdata] = useState({});
    const nav = useNavigate();
    const { idworker } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/update/${idworker}`, { fname, lname, idoffice })
            .then((res) => {
                nav('/');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:5000/office');
                setOffice(response1.data);

                const response2 = await axios.get(`http://localhost:5000/update/${idworker}`);
                setOdata(response2.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [idworker]);

    useEffect(() => {
        setFname(odata.fname || '');
        setLname(odata.lname || '');
        setIdoffice(odata.idoffice || '');
    }, [odata]);

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 bg-primary">
            <div className="bg-white rounded w-50 p-3">
                <form onSubmit={handleSubmit}>
                    <h2>แก้ไขข้อมูล</h2>
                    <div className="mb-2">
                        <label htmlFor="">ชื่อ</label>
                        <input
                            type="text"
                            value={fname}
                            placeholder="ใส่ชื่อ"
                            className="form-control"
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">นามสกุล</label>
                        <input
                            type="text"
                            value={lname}
                            placeholder="ใส่นามสกุล"
                            className="form-control"
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <div>
                        <label htmlFor="">สำนักงาน</label>
                        </div>
                        <select
                            onChange={(e) => setIdoffice(e.target.value)}
                            className="form-select"
                            value={idoffice}>
                            {office.map((d) => (
                                <option className="option" key={d.idoffice} value={d.idoffice}>
                                    {d.oname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-warning">แก้ไขข้อมูล</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
