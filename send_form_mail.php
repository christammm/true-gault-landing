<?php
if(isset($_POST['email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "bacha024@gmail.com";
    $email_subject = "Message from website";

    $email_from = $_POST['email'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $zip = $_POST['zip'];
    $device = $_POST['device'];

    function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
    }

    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Firstname: ".clean_string($firstname)."\n";
    $email_message .= "Lastname: ".clean_string($lastname)."\n";
    $email_message .= "Zip: ".clean_string($zip)."\n";
    $email_message .= "Device: ".clean_string($device)."\n";

    $headers = 'From: '.$email_from."\r\n".
        'Reply-To: '.$email_from."\r\n";
    @mail($email_to, $email_subject, $email_message, $headers);

}
?>