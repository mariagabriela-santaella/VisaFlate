
const indexedDB = window.indexedDB
const form = document.getElementById('citas')

if(indexedDB && form){
    let db
    const request = indexedDB.open('listClient',1)

    request.onsuccess = () =>{
        db = request.result
        console.log('OPEN',db)
        readData()

    }
    request.onupgradeneeded = () =>{
        db = request.result
        console.log('Create',db)
        const objectStore = db.createObjectStore('citas', {
            keyPath:'clienteCita'
        })

    }
    request.onerror = () =>{
        console.log('Error',error)
    }

    const addData = (data) =>{
        const transaction = db.transaction(['citas'], 'readwrite')
        const objectStore = transaction.objectStore('citas') 
        const request = objectStore.add(data)
    }
    const readData = () =>{
        const transaction = db.transaction(['citas'], 'readonly')
        const objectStore = transaction.objectStore('citas') 
        const request = objectStore.openCursor()

        request.onsuccess =(e)=>{
            const cursor = e.target.result
            if(cursor){
                console.log(cursor.value)
                cursor.continue()
            }else{
                console.log('no more data')
            }
        }
    }



    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        const data ={
            clienteCita:e.target.name.value,
            clienteApellido:e.target.lastname.value,
            sexoCliente:e.target.sexo.value,
            nacionalidadCliente:e.target.paisNac.value,
            nacimientoCliente:e.target.fechaNac.value,
            civilCliente:e.target.estadoCivil.value,
            domicilioCliente:e.target.adress.value,
            telefonoCliente:e.target.phone.value,
            correoCliente:e.target.mail.value,
            tipoVisa:e.target.typeVisa.value,
            citaCliente:e.target.fechaCita.value,
            horaCitaCliente:e.target.horaCita.value
        }
        addData(data)
    })
}