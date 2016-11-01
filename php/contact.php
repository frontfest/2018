<?php
/**********************************************************************
Theme Name: Eventz Html Theme
Version: 1.0.0
Author: Themeboxr Team
Email: info@themeboxr.com
Website: http://themeboxr.com
Copyright: All rights reserved by themeboxr.com
**********************************************************************/


    define('DS', DIRECTORY_SEPARATOR);


//options parameter for user

//if you want to save the contact informations in csv then change the below params to true, by default it's false
// the csv file location is /php/contacts.csv
    $save_in_csv = false;

    $admin_email_to         = 'admin@yourdomain.com'; // admin email who will get the contact email alert
    $admin_email_to_name    = "Company Name"; // Admin Name/Company name who will get the email alert
    $admin_email_from       = 'noreply@yourdomain.com';  // admin email from which email address email will be sent
    $admin_email_from_name  = 'System'; //admin name from which email will be sent
    $admin_send_subject     = 'Contact form alert'; //email subject what the admin will get as contact email alert
    $user_send_subject      = 'Thanks for contact, your copy'; //email subject what the user will get if the user agreed or select "copy me"

//end options parameter for user



    $list = array();
    $validation_message = array(
        'error' => false,
        'error_field' => array(),
        'message' => array()
    );

    $rules = array(
        'cbxname' => 'trim|required|alpha_spaces',
        'cbxemail' => 'trim|required|email',
        'cbxmessage' => 'trim|required|alpha_numeric_spaces',
    );

    if ($_POST) {
        require_once(__DIR__.DS.'class.validation.php');
        $frm_val = new validation;

        foreach ($rules as $post_key => $rule) {
            $frm_val->validate($post_key, $rule);
        }

        $validation_info = $frm_val->validation_info();
        $validation_message['error'] = !$validation_info['validation'];

        foreach ($validation_info['error_list'] as $error_field => $message) {
            $validation_message['error_field'][] = $error_field;
            $validation_message['message'][$error_field] = $message;
        }

        $cbxname        = $frm_val->get_value('cbxname');
        //var_dump($cbxname);
        $cbxemail       = $frm_val->get_value('cbxemail');
        ///var_dump($cbxemail);
        $cbxsendme      = isset( $_POST['cbxsendme'] ) ? 'on' : 'on';

        ///var_dump($cbxsendme);
        $cbxmessage     = $frm_val->get_value('cbxmessage');
        //var_dump($cbxmessage);
        //exit();


        //if save in csv true
        if ($save_in_csv && $validation_info['validation']) {
            $list[] = $cbxname;
            $list[] = $cbxemail;
            $list[] = $cbxmessage;
            $fp = fopen('contacts.csv', 'a');
            fputcsv($fp, $list);
            fclose($fp);
        }
        //end if save is csv true
        // $validation_message['message'] = 'This is success Process';
        //send email

        if($validation_info['validation']){
            //now prepare for sending email

            //include the php emailer library
            require 'phpmailer/PHPMailerAutoload.php';

            //create an instance of phpmailer class
            $mail = new PHPMailer;


            //some config if you need help based on your server configuration
            //$mail->isSMTP();
            //$mail->Host = 'mailtrap.io';  // Specify main and backup SMTP servers
            //$mail->SMTPAuth = true;
            //$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            //$mail->Port = 2525;                                    // TCP port to connect to
            //$mail->Username = '55569aef984b0f07e';                 // SMTP username
            //$mail->Password = 'a93f0387c7dabf';                    // SMTP password

            //add admin from email
            $mail->From = $admin_email_from;
            //add admin from name
            $mail->FromName = $admin_email_from_name;
            //add admin to email and name
            $mail->addAddress($admin_email_to ,$admin_email_to_name);

            //add more if you need more to recipient
            //$mail->addAddress('ellen@example.com');               // Name is optional

            //add if you need reply to
            //$mail->addReplyTo('info@example.com', 'Information');
            //add if you need cc
            //$mail->addCC('cc@example.com');

            //add if you need bcc
            // $mail->addBCC('bcc@example.com');

            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
            $mail->isHTML(true);                                  // Set email format to HTML

            $mail->Subject = $admin_send_subject;
            $mail->Body    = $cbxmessage;
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';



            if($mail->send() === true) {

                $validation_message['successmessage'] = 'Message has been sent successfully !';
            } else {
                $validation_message['successmessage'] = 'Sorry, Mail could not be sent. Please contact server admin.';
            }

            //send email to user if user agreed or selected "copy me"
            if($cbxsendme == 'on'){


                $mail2 = new PHPMailer;

                //some config if you need help based on your server configuration
                //$mail2->isSMTP();
                //$mail2->Host = 'mailtrap.io';  // Specify main and backup SMTP servers
                //$mail2->SMTPAuth = true;
                //$mail2->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                //$mail2->Port = 2525;                                    // TCP port to connect to
                //$mail2->Username = '55569aef984b0f07e';                 // SMTP username
                //$mail2->Password = 'a93f0387c7dabf';


                //some config if you need help based on your server configuration
                //$mail2->Host = 'localhost';  // Specify main and backup SMTP servers

                // $mail->Username = 'user@example.com';                 // SMTP username
                // $mail->Password = 'secret';                           // SMTP password
                // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                // $mail2->Port = 25;                                    // TCP port to connect to

                //add admin from email
                $mail2->From = $admin_email_from;
                //add admin from name
                $mail2->FromName = $admin_email_from_name;
                //now send to user
                //$mail->From = $admin_email_from;
                // $mail->FromName = $admin_email_from_name;
                //$mail->all_recipients = array();
                $mail2->addAddress($cbxemail ,$cbxname);     // Add a recipient, user who fillted the contact form
                //$mail->addAddress('ellen@example.com');               // Name is optional
                //$mail->addReplyTo('info@example.com', 'Information');
                //$mail->addCC('cc@example.com');
                // $mail->addBCC('bcc@example.com');

                //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
                //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
                $mail2->isHTML(true);                                  // Set email format to HTML

                $mail2->Subject = 'Copy Mail:'.$admin_send_subject;
                $mail2->Body    = $cbxmessage;


                //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                if($mail2->send() === true) {

                    $validation_message['successmessage'] = 'Message has been sent successfully !';

                } else {
                    $validation_message['successmessage'] = 'Sorry, Mail could not be sent. Please contact server admin.';

                }
            }
        }
        else{

        }

        //end send email

        echo json_encode($validation_message);
        die(1);
    }