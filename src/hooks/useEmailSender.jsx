import emailjs from "@emailjs/browser";

const useEmailSender = () => {
  const sendConfirmationEmail = async (templateParams) => {
    const emailData = {
      service_id: "service_t97yvyk",
      template_id: "template_0pej841",
      user_id: "sOtAzxE_AU9RuD2AQ",
      template_params: templateParams,
    };

    try {
      await emailjs.send(
        emailData.service_id,
        emailData.template_id,
        emailData.template_params,
        emailData.user_id,
      );
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  return { sendConfirmationEmail };
};

export default useEmailSender;