import { useState } from "react";
import validator from "validator";
import { isValidEmail } from "../../../helpers";

const initialState = {
  id: 0,
  name: "",
  email: "",
  password: "",
  phone: "",
  profiles: [],
  file: "",
  status_id: 1,
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  profiles: ""
}

export const useFormUsers = (setUser: any, user: any) => {
  const [userProfiles, setUserProfiles] = useState<any>([]);
  const [typePassword, setTypePassword] = useState({ type: 'password' });
  const [isLocked, setIsLocked] = useState(true);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [hasErrors, setHasErrors] = useState(true);

  // Reset form
  const resetForm = () => {
    setUser(initialState);
    setUserProfiles([]);
    setErrors(initialErrors);
  };

  // Hide and See Password
  const showHide = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setTypePassword((prev: any) => ({ type: prev.type === 'text' ? 'password' : 'text' }));
    setIsLocked((prev: boolean) => !prev);
  }

  const handleCheckboxChange = (profileId: number) => {
    // Check si el profileId existe en el array de profiles
    const profileIndex = userProfiles.indexOf(profileId);

    if (profileIndex === -1) {
      // Si el profileId no está en el arreglo, agregalo
      const newProfile = userProfiles.length === 0 ? [profileId] : [...userProfiles, profileId];

     setUserProfiles([...userProfiles, profileId]);
     setUser((prev: any) => ({ ...prev, profiles: newProfile }));

    } else {
      // Si el profileId ya está en el arreglo, elíminalo
      const updatedProfiles = userProfiles?.filter((id: number) => id !== profileId);
       setUserProfiles(updatedProfiles);
       setUser((prev: any) => ({ ...prev, profiles: updatedProfiles }));
    }
  };

  const handleChange = (e: any) => {
    
    const validationErrors: any = { ...errors };

    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());
    }

    if (e.target.name === "name" && isPasswordTouched) {
      // Validar el campo de nombre (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.name = ["El nombre es obligatorio"];
      } else {
        delete validationErrors.name;
      }
      setUser((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.name === "password" && isPasswordTouched) {
      // Expresion regular - valida que la contraseña cumpla con la documentacion (Un numero, una letra mayuscula y una minuscula, al menos 8 caracteres de longitud, )
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      validationErrors.password = [];

      if (!passwordRegex.test(e.target.value)) {
        // Agregamos los mensajes de error al array 'validationErrors.password'
        if (e.target.value.length < 8) {
          validationErrors.password.push(" La contraseña debe tener al menos 8 caracteres");
        }
        if (!/\d/.test(e.target.value)) {
          validationErrors.password.push(" Contener al menos un número");
        }
        if (!/[A-Z]/.test(e.target.value)) {
          validationErrors.password.push(" Incluir al menos una letra mayúscula");
        }
        if (!/[a-z]/.test(e.target.value)) {
          validationErrors.password.push(" Incluir al menos una letra minúscula");
        }
      } else {
        delete validationErrors.password;
      }
      if (e.target.value === "" && user.id) {
        delete validationErrors.password;
      }
      setUser((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.name === "email" && isPasswordTouched) {
      if (!isValidEmail(e.target.value) || validator.isEmpty(e.target.value)) {
        validationErrors.email = ["Correo Invalido o vacio"];
      } else {
        delete validationErrors.email;
      }
      setUser((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.name === "phone" && isPasswordTouched) {
      // Limpiar caracteres no numéricos
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      // Limitar a 10 dígitos
      e.target.value = e.target.value.slice(0, 10);

      if (e.target.length > 10 || e.target.value === "" || validator.isEmpty(e.target.value) || e.target.length === 0) {
        validationErrors.phone = ["Número telefonico no válido"];
      } else {
        delete validationErrors.phone;
      }
      setUser((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.name === "profiles") {
      if (!e.target.checked && userProfiles.length === 1) {
        validationErrors.profiles = ["Seleccione al menos un rol"];
      } else {
        delete validationErrors.profiles;
      }
      handleCheckboxChange(Number(e.target.value));
      //setUserProfiles([1,2,3,4]);
    }

    if (e.target.name === "status_id") {
      setUser((prev: any) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    }
   
    // Si hay errores, actualiza el estado con ellos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setHasErrors(true);
    } else {
      setErrors({});
      setHasErrors(false);
    }
  };

  return {
    // Methods
    handleCheckboxChange,
    handleChange,
    setUserProfiles,
    showHide,
    setIsPasswordTouched,
    resetForm,
    setErrors,
    setHasErrors,
    // Properties
    isPasswordTouched,
    userProfiles,
    typePassword,
    isLocked,
    errors,
    hasErrors,
  };
};
