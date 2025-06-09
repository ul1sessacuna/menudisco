import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import './AdminMenu.css'

function AdminMenu() {
    const [drinks, setDrinks] = useState([])
    const [newDrink, setNewDrink] = useState({ nombre: '', precio: '', descripcion: '' })
    const [editMode, setEditMode] = useState(null)
    const [editedDrink, setEditedDrink] = useState({})

    const fetchDrinks = async () => {
        const querySnapshot = await getDocs(collection(db, 'tragos'))
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setDrinks(data)
    }

    useEffect(() => {
        fetchDrinks()
    }, [])

    const addDrink = async () => {
        await addDoc(collection(db, 'tragos'), newDrink)
        setNewDrink({ nombre: '', precio: '', descripcion: '' })
        fetchDrinks()
    }

    const deleteDrink = async (id) => {
        await deleteDoc(doc(db, 'tragos', id))
        fetchDrinks()
    }

    const startEdit = (drink) => {
        setEditMode(drink.id)
        setEditedDrink(drink)
    }

    const saveEdit = async () => {
        await updateDoc(doc(db, 'tragos', editMode), editedDrink)
        setEditMode(null)
        setEditedDrink({})
        fetchDrinks()
    }

    return (
        <div className="admin-container">
            <h2>Panel de Administración</h2>

            <div className="add-form">
                <input type="text" placeholder="Nombre" value={newDrink.nombre} onChange={(e) => setNewDrink({ ...newDrink, nombre: e.target.value })} />
                <input type="text" placeholder="Descripción" value={newDrink.descripcion} onChange={(e) => setNewDrink({ ...newDrink, descripcion: e.target.value })} />
                <input type="number" placeholder="Precio" value={newDrink.precio} onChange={(e) => setNewDrink({ ...newDrink, precio: e.target.value })} />
                <button onClick={addDrink}>Agregar</button>
            </div>

            <div className="drink-list">
                {drinks.map(drink => (
                    <div key={drink.id} className="drink-item">
                        {editMode === drink.id ? (
                            <>
                                <input type="text" value={editedDrink.nombre} onChange={(e) => setEditedDrink({ ...editedDrink, nombre: e.target.value })} />
                                <input type="text" value={editedDrink.descripcion} onChange={(e) => setEditedDrink({ ...editedDrink, descripcion: e.target.value })} />
                                <input type="number" value={editedDrink.precio} onChange={(e) => setEditedDrink({ ...editedDrink, precio: e.target.value })} />
                                <button onClick={saveEdit}>Guardar</button>
                            </>
                        ) : (
                            <>
                                <h3>{drink.nombre}</h3>
                                <p>{drink.descripcion}</p>
                                <p>${drink.precio}</p>
                                <button onClick={() => startEdit(drink)}>Editar</button>
                            </>
                        )}
                        <button onClick={() => deleteDrink(drink.id)} className="delete">Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminMenu
