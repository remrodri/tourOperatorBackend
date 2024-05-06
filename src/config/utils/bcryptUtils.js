import bcrypt from 'bcrypt';

const saltRounds = 10;

//hasheo de password
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('hashedPassword::: ', hashedPassword);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error al hashear password: ${error}`);
  }
};

//verificamos si el password es correcto
export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;//devuelve  true si la contraseña es correcta
  } catch (error) {
    throw new Error(`Error al comparar passwords: ${error}`);
  }
};

