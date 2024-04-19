import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container, Button } from "reactstrap";
import style from './MultiplesImagenes.module.css'
import axios from "axios";

const MultiplesImagenes = () => {
    const [image, setImage] = useState(null); // Cambiado a solo una imagen
    const [loading, setLoading] = useState(false);

    const handleDrop = async (files) => {
        setLoading(true);
        try {
            const file = files[0]; // Obtener solo el primer archivo (imagen)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', "Byraices");
            formData.append("api_key", "459789382519731");
            formData.append("timestamp", (Date.now() / 1000) | 0);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            });
            setImage(response.data.secure_url); // Establecer la imagen como la única imagen
        } catch (error) {
            console.error("Error al subir imágenes:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteImage = () => {
        setImage(null); // Eliminar la imagen
    }

    useEffect(() => {
        if (image) {
            localStorage.setItem('uploadedImage', JSON.stringify(image)); // Guardar solo la imagen actual
        } else {
            localStorage.removeItem('uploadedImage'); // Eliminar la imagen del almacenamiento local si no hay ninguna
        }
    }, [image]);

    useEffect(() => {
        const storedImage = JSON.parse(localStorage.getItem('uploadedImage'));
        if (storedImage) {
            setImage(storedImage);
        }
    }, []);

    function imagePreview() {
        if (loading) {
            return <h3>Cargando imagen...</h3>;
        }
        return (
            <div>
                <Button color="danger" onClick={handleDeleteImage}>Eliminar imagen</Button> {/* Cambiado a eliminar imagen en lugar de todas las imágenes */}
                {image
                    ? (
                        <div className={style.imageContainer}>
                            <div className={style.imageItem}>
                                <img
                                    alt='Imagen'
                                    className={style.image}
                                    src={image}
                                />
                            </div>
                        </div>
                    )
                    : <h3>No hay imagen</h3>
                }
            </div>
        );
    }

    return (
        <div>
            <Container>
                <h1 className={style.textCenter}>Sube tu imagen aquí</h1> {/* Modificado para indicar que solo se debe subir una imagen */}
                <Dropzone
                    className={style.dropzone}
                    onDrop={handleDrop}
                    maxFiles={1} // Limitar a una sola imagen
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className={style.dropzone} {...getRootProps({className: "dropzone"})}>
                                <input {...getInputProps()} />
                                <span>📂</span>
                                <p>Coloca tu imagen aquí</p> {/* Modificado para indicar que solo se debe colocar una imagen */}
                            </div>
                        </section>
                    )}
                </Dropzone>
                {imagePreview()}
            </Container>
        </div>
    );
}

export default MultiplesImagenes;
