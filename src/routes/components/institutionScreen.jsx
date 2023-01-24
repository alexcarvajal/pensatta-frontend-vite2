import React from "react"
import EditorModal from "./editorModal"
import NewInstModal from "./newInstModal"
import "../../styles/institutionScreen.css"

export default function InstitutionScreen({institutionList}){

    const [currInst, setCurrInst] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [data, setData] = React.useState({ institution: "", field: "" })

    const handleChange = ({target}) => {
        if(target.checked){
            setCurrInst(target.value)
        }
    }

    const handleShowModal = ({institution, field}) => {
        setData({institution, field})
        setShowModal(true)
    }

    return(
        <div className="institution-screen">
            <div className="institutions-list">
                <ul>
                    {institutionList.map((institution, index)=>{
                        return (
                            <li key={index}>
                                <input type="radio" name="institution" id={institution.id} value={index} onChange={handleChange} />
                                <label htmlFor={institution.id}>{institution.id}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="institution-info">
                <div className="editable-info">
                    <p>Nombre: {institutionList[currInst]?.name && <span>{institutionList[currInst]?.name} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"name" })}}></i></span> }</p>
                    <p>Email: {institutionList[currInst]?.email && <span>{institutionList[currInst]?.email} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"email" })}}></i></span>}</p>
                    <p>Pais: {institutionList[currInst]?.country && <span>{institutionList[currInst]?.country} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"country" })}}></i></span>}</p>
                    <p>Provincia: {institutionList[currInst]?.province && <span>{institutionList[currInst]?.province} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"province" })}}></i></span>}</p>
                    <p>Ciudad: {institutionList[currInst]?.city && <span>{institutionList[currInst]?.city} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"city" })}}></i></span>}</p>
                </div>
                <div className="non-editable-info">
                    <p>Estudiantes: {institutionList[currInst]?.num_students}</p>
                    <p>Puntuación: {institutionList[currInst]?.average_score}</p>
                </div>
            </div>
            {!showAddModal && <button onClick={()=>{setShowAddModal(true)}}>Nueva Institución</button>}
            {showModal && <EditorModal institution={data.institution} field={data.field} close={setShowModal} />}
            {showAddModal && <NewInstModal close={setShowAddModal} />}
        </div>
    )
}