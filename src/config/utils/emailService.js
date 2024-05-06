import { Resend } from "resend";

const resend = new Resend("re_hNUDExNJ_GCVNWDu6LPbHijaAsnvNr1HB");

export const sendPasswordResetEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Recuperar contraseña",
      html: `
      <p>Estimado/a ${email}, se ha solicitado un la recuperacion de contraseña para su cuenta en Picot.</p>
      
      `,
    });
    if (error) {
      console.error("Error al enviar el correo electronico", error);
      return {
        succes: false,
        message:
          "Correo electronico de restablecimiento de contrasenia enviado correctamente",
      };
    }
  } catch (error) {
    console.error("Error al enviar el correo electronico: ", error);
    return { succes: false, message: "Error al eviar el correo electronico" };
  }
};
