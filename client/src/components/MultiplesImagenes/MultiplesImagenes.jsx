import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container, Button } from "reactstrap";
import style from './MultiplesImagenes.module.css'
import axios from "axios";

const MultiplesImagenes = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDrop = async (files) => {
        setLoading(true);
        try {
            const file = files[0]; // Obtener solo el primer archivo
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', "Byraices");
            formData.append("api_key", "459789382519731");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            });

            setImage(response.data.secure_url); // Establecer la URL de la imagen subida

            localStorage.setItem('uploadedImage', JSON.stringify(response.data.secure_url)); // Guardar la imagen en `localStorage`
        } catch (error) {
            console.error("Error al subir imágenes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = () => {
        setImage(null); // Eliminar la imagen del estado
        localStorage.removeItem('uploadedImage'); // Eliminar del `localStorage`
    };

    useEffect(() => {
        const storedImage = JSON.parse(localStorage.getItem('uploadedImage'));
        if (storedImage) {
            setImage(storedImage); // Cargar la imagen del `localStorage`
        }
    }, []); // Cargar al montar el componente

    function imagePreview() {
        if (loading) {
            return <h3>Cargando imagen...</h3>;
        }

        return (
            <div>
                {image ? (
                    <div className={style.imageContainer}>
                        <div className={style.imageItem}>
                            <img
                                alt='Imagen'
                                className={style.image}
                                src={image}
                            />
                            <Button color="danger" onClick={handleDeleteImage}>
                                Eliminar imagen
                            </Button>
                        </div>
                    </div>
                ) : (
                    <h3>No hay imagen</h3>
                )}
            </div>
        );
    }

    return (
        <Container>
            <h1 className={style.textCenter}>Sube tu imagen aquí</h1>
            <Dropzone onDrop={handleDrop} maxFiles={1}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: style.dropzone })}>
                        <input {...getInputProps()} />
                        📂
                        <p>Coloca tu imagen aquí</p>
                    </div>
                )}
            </Dropzone>
            {imagePreview()}
        </Container>
    );
};

export default MultiplesImagenes;

