import { useRef, useState } from "react";

export const useFile = (setUser: any) => {
  const fileInputRef = useRef<any>(null);
  const [image, setImage] = useState<any>("");
  
  const handleAdd = (newFile: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", (ev) => {
      const fileBase64 = ev.target?.result;
      setImage(fileBase64);
      setUser((prev: any) => ({
        ...prev,
        file: fileBase64
      }))
    });
    reader.readAsDataURL(newFile.target.files[0]);
  };

  // Cambiar imagen
  const handleChangeImage = (image: string) => {
    setImage(image);
  }

  // Eliminar imagen
  const handleDelete = (deleted: any) => {
    setImage("");
  };

  // Click Ref
  const handleButtonClick = () => {
    fileInputRef.current.click()!; // Simula un clic en el input de tipo file
  };

  return {
    // Methods
    handleAdd,
    handleDelete,
    handleButtonClick,
    handleChangeImage,
    // Properties
    fileInputRef,
    image
  }
}