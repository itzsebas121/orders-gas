import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import MapLocation from '../../components/MapLocation';
const Register = () => {
    const [userType, setUserType] = useState('');
    const [location, setLocation] = useState('');
    const [locationName, setLocationName] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };
    const closeRegister = () => {
        document.querySelector('.overlay-register').classList.remove('active');
    }
    const handleCurrentLocation = (event) => {
        getLocation((currentLocation) => {
            document.getElementById('locationName').value = currentLocation;
        });
    };
    const handleShowMap = () => {
        document.querySelector('.overlay-map').classList.add('active');

    }
    const getLocationMap = (value) => {
        setCoordinates(value);
        getLocationName((currentLocation) => {
            document.getElementById('locationName').value = currentLocation;
        });
    }
    const getLocationName = (Location) => {
        const aux = coordinates.lat + ", " + coordinates.lng;
        alert(aux)
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=pk.eyJ1Ijoic2ViYXMxMjEiLCJhIjoiY20yOWNvNno3MDN2cTJ2cHl4OWk2d2l3aCJ9.zR3wF032kr8Fq9NvziGLEw`).
            then(response => response.json())
            .then(
                data => {
                    setLocationName(data.features[0].place_name)
                    Location(data.features[0].place_name)
                }
            );
        setLocation(aux);
    }
    const getLocation = (Location) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const aux = position.coords.latitude + ", " + position.coords.longitude;
                    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1Ijoic2ViYXMxMjEiLCJhIjoiY20yOWNvNno3MDN2cTJ2cHl4OWk2d2l3aCJ9.zR3wF032kr8Fq9NvziGLEw`).
                        then(response => response.json())
                        .then(
                            data => {
                                setLocationName(data.features[0].place_name)
                                Location(data.features[0].place_name)
                            }
                        );
                    setLocation(aux);
                },
                (error) => {
                    console.error("Error al obtener ubicación:", error.message);
                },
                {
                    enableHighAccuracy: true,
                }
            );
        } else {
            alert("Geolocalización no está disponible en este navegador.");
        }

    }
    const clearInputs = () => {
        document.getElementById('name').value = '';
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('passwordUser').value = '';
        document.getElementById('userName').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('locationName').value = '';
        setCoordinates(null);
        setLocationName('');
        setLocation('');

    }
    const handleSumit = () => {
        const typeUser = document.getElementById('userType').value;
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastName').value;
        const password = document.getElementById('passwordUser').value;
        const username = document.getElementById('userName').value;
        const phone = document.getElementById('phoneNumber').value;
        if (typeUser == '') {
            alert('Selecciona un tipo de usuario');
            return;
        }

        if (name == '' || phone == '' || lastname == '' || password == '' || username == '') {
            alert('Rellena todos los campos');
            return;
        }
        /* if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        if (username.length < 8) {
            alert('El nombre de usuario debe tener al menos 8 caracteres');
            return;
        } */
        if (typeUser == 'Cliente') {
            if (location == '' || locationName == '') {
                alert('Selecciona una ubicación');
                return;
            }
            const client = {
                Name: name,
                LastName: lastname,
                HashedPassword: password,
                UserName: username,
                PhoneNumber: phone,
                Location: location,
                NameLocation: locationName
            }

            fetch('http://localhost:3000/CreateClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(client),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message == "Exito") {
                        alert("Usuario creado correctamente");
                        clearInputs();
                        closeRegister();
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar la solicitud:', error);
                });
        } else {
            const Distributor = {
                Name: name,
                LastName: lastname,
                HashedPassword: password,
                UserName: username,
                PhoneNumber: phone
            }

            fetch('http://localhost:3000/CreateDistributor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Distributor),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message == "Exito") {
                        alert("Usuario creado correctamente");
                        clearInputs();
                        closeRegister();
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error al enviar la solicitud:', error);
                });
        }
        const locationUser = location;
        const locationNameUser = locationName;

    }
    return (
        <>
            <div className="form-register">
                <div className="header">

                    <h1>Crear cuenta</h1>
                    <FontAwesomeIcon icon={faX} className="icon-close" onClick={closeRegister} />
                </div>
                <form>
                    <div className="columns-register">
                        <div className="item-register">

                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div className="item-register">

                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Ingrese su apellido"
                            />
                        </div>
                    </div>

                    <div className="columns-register">
                        <div className="item-register">

                            <label htmlFor="userName">Usuario</label>
                            <input
                                type="text"
                                id="userName"
                                placeholder="Ingrese su usuario"
                            />
                        </div>
                        <div className="item-register">

                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="passwordUser"
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                    </div>

                    <div className="columns-register">
                        <div className="item-register">
                            <label htmlFor="userType">Seleccione tipo de usuario</label>
                            <select
                                name="userType"
                                id="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                            >
                                <option value="">Seleccione</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Distribuidor">Distribuidor</option>
                            </select>
                        </div>
                        <div className="item-register">
                            <label htmlFor="phoneNumber">Numero de telefono</label>
                            <input type="number" id="phoneNumber" placeholder="Ingrese su numero de telefono" />
                        </div>
                    </div>


                    {userType === "Cliente" && (
                        <>
                            <div className="columns-register">
                                <div className="item-register">

                                    <label htmlFor="location">Ubicacion</label>
                                    <button type='button' id='location' onClick={handleCurrentLocation}>Ubicacion Actual</button>
                                </div>
                                <div className="item-register">

                                    <label htmlFor="">Buscar Ubicacion</label>
                                    <button type='button' id='searchLocation' onClick={handleShowMap} >Ver Mapa</button>
                                </div>
                            </div>
                            <div className="columns-register">
                                <div className="item-register">
                                    <input type="text" id='locationName' placeholder='Ingrese su ubicacion' readOnly />
                                </div>
                            </div>
                        </>
                    )}
                </form>
                <button type="button" onClick={handleSumit} >Registrarse</button>
            </div>
            <div className="overlay-map">

                <MapLocation sendLocationMap={getLocationMap}></MapLocation>
            </div>
        </>
    );
};

export default Register;

