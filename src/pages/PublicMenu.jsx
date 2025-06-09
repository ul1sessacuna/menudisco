import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import './PublicMenu.css'

function PublicMenu() {
    const [tragos, setTragos] = useState([])

    useEffect(() => {
        const fetchTragos = async () => {
            const querySnapshot = await getDocs(collection(db, 'tragos'))
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setTragos(data)
        }
        fetchTragos()
    }, [])

    return (
        <div className="public-menu-container">
            <video autoPlay loop muted className="background-video">
                <source src="/fondo.mp4" type="video/mp4" />
            </video>

            <div className="content-overlay">
                <img src="/buhos.png" alt="Logo Búhos" className="logo-img" />

                <h1 className="menu-title">
                    MENÚ
                    <span>de tragos</span>
                </h1>

                <hr className="divider" />

                <div className="trago-list">
                    {tragos.map((trago) => (
                        <div className="trago-item" key={trago.id}>
                            <span className="nombre">{trago.nombre}</span>
                            <span className="puntos"></span>
                            <span className="precio">${trago.precio}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublicMenu
